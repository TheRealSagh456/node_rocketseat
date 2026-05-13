import type { FastifyInstance } from "fastify"
import request from "supertest"
import { hash } from 'bcryptjs'
import {prisma} from '../../../lib/prisma.js'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
     await prisma.user.create({
      data: {  
        name: 'Fallenzão',
        email: 'respeita@overdadeiro.com',
        password_hash: await hash('stopblowingmymind', 6),
        role: isAdmin ? 'ADMIN' : 'MEMBER'
}
})

    const authResponse = await request(app.server).post('/sessions').send({
        email: 'respeita@overdadeiro.com',
        password: 'stopblowingmymind',
    })

    const {token} = authResponse.body

    return {
        token
    }
}