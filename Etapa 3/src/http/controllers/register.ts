import z from "zod"
import type { FastifyRequest, FastifyReply } from "fastify"
import { registerUseCase } from "../../use-cases/register.js"

export async function register(request: FastifyRequest, reply: FastifyReply) {

    const registerUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })

    const {name, email, password} = registerUserSchema.parse(request.body)

    try {
        await registerUseCase({
            name,
            email,
            password,
        })
    } catch (err) {  
        return reply.status(409).send()
    }

    return reply.status(201).send()
}