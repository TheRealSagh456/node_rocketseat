import { FastifyInstance, FastifyRequest } from "fastify";
import {z} from "zod"
import { randomUUID } from "node:crypto";
import {} from '@fastify/cookie'
import { knecs } from "../../knexfile";
import { check } from "../middlewares/checkookie";

export async function RR(app:FastifyInstance) {
    

    app.get('/refeicoes', {preHandler: [check]}, async (request, reply) => {
    
        const {sessionID} = request.cookies

        return await knecs('refeicoes').where({
       ID_Usuario: sessionID
    }).select()
})

    app.get('/refeicoes/metricas',{preHandler: [check]} , async (request, reply) => {
        
        const {sessionID} = request.cookies

        const lista_ordenada_data = await knecs('refeicoes')
        .where({ID_Usuario: sessionID})
        .orderBy('Data_e_hora', 'asc')

        const totalref = lista_ordenada_data.length

        const refnadieta = lista_ordenada_data.filter(f => f.Esta_dentro_da_dieta === 'Sim').length

        const refforadieta = lista_ordenada_data.filter(f => f.Esta_dentro_da_dieta === 'Não').length

        let sequencia = 0
        let melhorseq = 0
        
        for(const refeicao of lista_ordenada_data) {
            if(refeicao.Esta_dentro_da_dieta === 'Sim') {
                sequencia++
                if(sequencia>melhorseq) {
                    melhorseq = sequencia
                }
            } else {
                sequencia = 0
            }

        }

        return reply.status(200).send({
            Total_de_Refeições: totalref,
            Refeições_dentro_da_dieta: refnadieta,
            Refeições_fora_da_dieta: refforadieta,
            Melhor_sequência_de_refeições_dentro_da_dieta: melhorseq
        })

    })

    app.get('/refeicoes/:NomeOrID', {preHandler: [check]}, async (request, reply) => {

        const {sessionID} = request.cookies

        let {NomeOrID} = request.params as {NomeOrID: string}
        
        const refeicao = await knecs('refeicoes').where({
            ID_Usuario: sessionID
        }).andWhere(
            function() {this.where('ID', NomeOrID).orWhere('Nome', NomeOrID)}
        )
        

        if(!refeicao) {
            return reply.status(404).send('Refeição não encontrada!')
        }
        
        return {refeicao} 
    })


    app.post('/refeicoes', async (request, reply) => {
        
        const criarRefeicao = z.object({
            Nome: z.string(),
            Descricao: z.string(),
            Esta_dentro_da_dieta: z.string() 
        })

        const {Nome, Descricao, Esta_dentro_da_dieta} = criarRefeicao.parse(request.body) 

        let sessionID = request.cookies.sessionID

        if(!sessionID) {
            
            sessionID = randomUUID()
            
            reply.setCookie('sessionID', sessionID, {
                path: '/',
                maxAge: 60**2*24*7
            })
        }

            let dieta = 'não'
            let sacento = 'nao'

            const metrica = Esta_dentro_da_dieta.toLowerCase()

            if(metrica === 'sim') {
                dieta = 'Sim'
            } else if(metrica === dieta || metrica === sacento) {
                dieta = 'Não'
            } else {
                return reply.status(400).send('Insira dados válidos!')
            }

        await knecs('refeicoes').insert({
            ID: randomUUID(),
            ID_Usuario: sessionID,
            Nome: Nome,
            Descricao: Descricao,
            Esta_dentro_da_dieta: dieta,
        })
        return reply.status(201).send('Refeição adicionada!')
    })

    app.delete('/refeicoes/:id', {preHandler: [check]}, async (request, reply) => {
    
    const {sessionID} = request.cookies

    const {id} = request.params as {id: string}

    await knecs('refeicoes').where({
        ID_Usuario: sessionID,
        ID: id
    }).delete()

    return reply.status(200).send('Registro apagado com sucesso!')


    })

    app.patch('/refeicoes/:id',{preHandler: [check]} ,async (request, reply)=>{

        const {sessionID} = request.cookies 
        
        const {id} = request.params as {id: string}

        const atualizar = z.object({
            Nome: z.string().optional(),
            Descricao: z.string().optional(),
            Esta_dentro_da_dieta: z.string().optional()
        })

        const atualizamento = atualizar.parse(request.body)

            if(atualizamento.Esta_dentro_da_dieta) {
                const metrica = atualizamento.Esta_dentro_da_dieta.toLowerCase()
        
            if(metrica === 'sim') {
                atualizamento.Esta_dentro_da_dieta = 'Sim'
            } else if(metrica === 'não' || metrica === 'nao') {
                atualizamento.Esta_dentro_da_dieta = 'Não'
            } else {
                return reply.status(400).send('Insira dados válidos!')
            }}

        const resultado = await knecs('refeicoes').where({
            ID: id,
            ID_Usuario: sessionID
        }).update(atualizamento)

        if(resultado === 0) {
            return reply.status(404).send('Refeição não encontrada!')
        }

        return reply.status(200).send('Registro atualizado com sucesso!')
    })

}
