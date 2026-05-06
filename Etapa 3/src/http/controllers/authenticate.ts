import z from "zod"
import type { FastifyRequest, FastifyReply } from "fastify"
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js"
import { AuthenticateUseCase } from "../../use-cases/authenticate.js"
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error.js"
import { makeAuthenticaseUseCase } from "../../use-cases/factories/make-authenticate-use-case.js"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const authenticateUserSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password} = authenticateUserSchema.parse(request.body)

    try {
        
        
        const authenticateUseCase = makeAuthenticaseUseCase()
        
        await authenticateUseCase.execute({
            email,
            password,
        })
    } catch (err) {  
        if(err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message})
        }

        throw err

    }

    return reply.status(200).send()
}