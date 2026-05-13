import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes.js'
import { ZodError } from 'zod'
import { env } from './env/index.js'
import fastifyJwt from '@fastify/jwt'


export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(usersRoutes)

app.setErrorHandler((error, _request, reply) => {
    if(error instanceof ZodError) {
        return reply.status(408).send({message: 'Validation error.', issues: error.format()})
    }

    if(env.NODE_ENV != 'production') {
        console.error(error)
    } else {

    }

    return reply.status(500).send({message: 'Internal server error'})
})