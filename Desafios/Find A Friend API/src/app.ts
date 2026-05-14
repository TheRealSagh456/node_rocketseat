import fastify from 'fastify'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { RegisterOrgUseCase } from './use-cases/register-org-use-case.js'
import { PrismaOrgsRepository } from './repositories/prisma-org-repository.js'
import { prisma } from './lib/prisma.js'

export const app = fastify()

app.get('/ORGs', async (request: FastifyRequest, reply: FastifyReply) => {

    const orgs = await prisma.org.findMany()

    reply.status(200).send(orgs)

})

app.post('/ORGs', async (request: FastifyRequest, reply: FastifyReply) => {

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

    reply.status(201).send()
})

app.post('/Pets', async (request: FastifyRequest, reply: FastifyReply) => {
    
    const petSchema = z.object({
        org: z.string(),
        name: z.string(),
        age: z.string(), 
        about: z.string(), 
        energy: z.string(), 
        independency: z.string(), 
        ambient: z.string(),
        size: z.string(),
        requirements: z.string()
    })
})
