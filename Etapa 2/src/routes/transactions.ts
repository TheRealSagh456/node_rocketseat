import type { FastifyInstance } from "fastify"
import { knecs } from "../database.js"
import {z} from 'zod'
import { randomUUID } from "node:crypto"
import { error } from "node:console"
import { check } from "../middleware/check-session-id.js"

//testes
// unitários: testa uma unidade da aplicação (uma função por exemplo)           (MUITOS)
// integração: comunicação entre 2 ou + unidades (reação em cadeia)             (ALGUNS)
// e2e - end to end - ponta a ponta: simula um usuario operando a aplicação     (POUCOS)
//  |
//  L Front-end: abrir a pagina de login, digitar texto x no campo x, clicar em botão
//  |
//  L Back-end: chamadas HTTP, websockets (camadas que se comunicam com o front no geral)

// Pirâmide de testes: E2E (pois são independentes)


export async function transactionsRoutes(app: FastifyInstance) {

    app.get('/',{preHandler: [check]}, async (request, reply) => {

        const {sessionId} = request.cookies

        const transactions = await knecs('transactions')
        .where('session_id', sessionId)
        .select()
    
        return {transactions, }
    })

    app.get('/:id',{preHandler: [check]}, async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const {id} = getTransactionParamsSchema.parse(request.params)

        const {sessionId} = request.cookies


        const transaction = await knecs('transactions').
        where({
            session_id: sessionId,
            id,
        })
            .first()

        return {transaction,}

    })

    app.get('/summary',{preHandler: [check]}, async (request) => {
    
        const {sessionId} = request.cookies
        
        const summary = await knecs('transactions').sum('amount', {as: 'amount'}).where('session_id', sessionId).first()
    return {summary,}        
    })
    
    app.post('/', async (request, reply) => {

        const createTransactionBodySchema = z.object({

        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']), //credito entra debito sai
    })

    const {title, amount, type} = createTransactionBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if(!sessionId) {
        sessionId = randomUUID()
        reply.cookie('sessionId', sessionId, {
            path: '/',
            maxAge: 60*60*24*7
        })
    }

     await knecs('transactions')
    .insert({
        id: crypto.randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
    })

    return reply.status(201).send('Mandado!')
    })
}

