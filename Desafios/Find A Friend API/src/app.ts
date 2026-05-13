import fastify from 'fastify'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ORG } from './Interfaces/Org-interface.js'

export const app = fastify()

let ORGs: ORG[] = []

app.get('/ORGs', async (request: FastifyRequest, reply: FastifyReply) => {

    reply.status(200).send({ORGs})

})

app.post('/ORGs', async (request: FastifyRequest, reply: FastifyReply) => {

    const org = {
        name: 'Força Jovem',
        address: 'Casa da mãe joana, quadra 67',
        phone: '40028922'
    }

    ORGs.push(org)

    reply.status(200).send('Enviado!')
})
