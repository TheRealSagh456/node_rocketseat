import z from "zod"
import type { FastifyRequest, FastifyReply } from "fastify"
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error.js"
import { makeAuthenticaseUseCase } from "../../../use-cases/factories/make-authenticate-use-case.js"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const authenticateUserSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password} = authenticateUserSchema.parse(request.body)

    try {
        
        
        const authenticateUseCase = makeAuthenticaseUseCase()
        
        const {user} = await authenticateUseCase.execute({
            email,
            password,
        })

        const token = await reply.jwtSign(
            {
                role: user.role,
            }, {
            sign: {
                sub: user.id,
            }
        })

        const refreshToken = await reply.jwtSign(
            {
                role: user.role,
            }, {
            sign: {
                sub: user.id,
                expiresIn: '7d',
            }
        })


        return reply.setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
        })
        .status(200).send({
            token,
        })


    } catch (err) {  
        if(err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message})
        }

        throw err

    }
}