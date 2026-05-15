import fastify from 'fastify'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { RegisterOrgUseCase } from './use-cases/register-org-use-case.js'
import { PrismaOrgsRepository } from './repositories/prisma-org-repository.js'
import { prisma } from './lib/prisma.js'
import { PrismaPetRepository } from './repositories/prisma-pet-repository.js'
import { RegisterPetUseCase } from './use-cases/register-pet-use-case.js'
import { Age, AmbientSpace, Energy, IndependencyLevel, Petsize } from '@prisma/client'
import { makeAuthenticateUseCase } from './use-cases/factories/make-authenticate-use-case.js'
import fastifyJwt from '@fastify/jwt'
import { env } from './env/index.js'
import { verifyJWT } from './middlewares/verify-jwt.js'
import { FetchPetsByCityUseCase } from './use-cases/fetch-pets-by-city-use-case.js'
import { FetchPetByIdUseCase } from './use-cases/fetch-pet-by-id-use-case.js'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.get('/ORGs', async (request: FastifyRequest, reply: FastifyReply) => {

    const orgs = await prisma.org.findMany()

    reply.status(200).send(orgs)

})

app.post('/ORGs' ,async (request: FastifyRequest, reply: FastifyReply) => {

    const orgSchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string(),
        address: z.string(),
        phone: z.string(),
        city: z.string()
    })

    const {name, email, password, address, phone, city} = orgSchema.parse(request.body)

    const rep = new PrismaOrgsRepository()
    const orgReg = new RegisterOrgUseCase(rep)

    await orgReg.execute({name, email, password, address, phone, city})

    reply.status(201).send('Org criada.')
})

app.post('/Sessions', async (request: FastifyRequest, reply: FastifyReply) => {

    const orgAuthSchema = z.object({
        email: z.email(),
        password: z.string()
    })

    const {email, password} = orgAuthSchema.parse(request.body)

    const authenticateOrg = makeAuthenticateUseCase()

    const org = (await authenticateOrg).execute({email, password})

    const token = await reply.jwtSign({}, {
        sign: {
            sub: (await org).id,
            expiresIn: '7d'
        }
    }
)

    return reply.status(200).send({token})

})

app.get('/Pets', async (request: FastifyRequest, reply: FastifyReply) => {

    const petsQuerySchema = z.object({
        city: z.string().min(1),
        age: z.enum(Age).optional(),
        energy: z.enum(Energy).optional(),
        size: z.enum(Petsize).optional(),
        independency: z.enum(IndependencyLevel).optional()

    })
    
    const {city, age, energy, independency, size} = petsQuerySchema.parse(request.query)

    if(!city) {
        return reply.status(400).send('City is required to find pets.')
    }

    const prismaPetRepository = new PrismaPetRepository()
    const fetchPetsByCity = new FetchPetsByCityUseCase(prismaPetRepository)

    const {pets} = await fetchPetsByCity.execute({
    city,
    ...(age && { age }),
    ...(energy && { energy }),
    ...(size && { size }),
    ...(independency && { independency }),
    })

    return reply.status(200).send({pets})

})

app.get('/Pets/:id', async (request: FastifyRequest, reply: FastifyReply) => {

    const byIdPetSchema = z.object({
        id: z.string()
    })

    const byIdPet = byIdPetSchema.parse(request.params)

    const prismaPetRepository = new PrismaPetRepository()
    const fetchPetsById = new FetchPetByIdUseCase(prismaPetRepository)

    const pet = await fetchPetsById.execute(byIdPet)

    return reply.status(200).send(pet)
})

app.post('/Pets', {onRequest: [verifyJWT]}, async (request: FastifyRequest, reply: FastifyReply) => {
    

    const petSchema = z.object({
        org: z.string(),
        org_id: z.string(),
        name: z.string(),
        age: z.enum(Age), 
        about: z.string(), 
        energy: z.enum(Energy), 
        independency: z.enum(IndependencyLevel), 
        ambient: z.enum(AmbientSpace),
        size: z.enum(Petsize),
        requirements: z.array(z.string()).optional()
    })

    const {org_id, org, name, age, about, energy, independency, ambient, size, requirements} = petSchema.parse(request.body)

    const rep = new PrismaPetRepository()
    const petReg = new RegisterPetUseCase(rep)

    await petReg.execute({org_id, org, name, age, about, energy, independency, ambient, size, requirements})

    return reply.status(201).send('Pet created')
})
