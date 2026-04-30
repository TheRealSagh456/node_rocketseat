import { fazedordeurl } from '../utils/fazedordeurl.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'


let database = new Database()
let dia = new Date().getDate()
let mês = new Date().getMonth()+1
let ano = new Date().getFullYear()
let horas = new Date().getHours()
let minutos = new Date().getMinutes()
    

export const routes = [
    {
        method: 'GET',
        url: fazedordeurl('/tarefas'),
        handler: (req, res) => {

            const {search} = req.query
            
            const tarefas = database.selecionar('tarefas', search ? {
                tarefa: search,
                descrição: search,
            } : null)
            
            return res
            .end((JSON.stringify(tarefas)))
        
        }
    },

    {
        method: 'POST',
        url: fazedordeurl('/tarefas'),
        handler: (req, res) => {
      
        const { tarefa, descrição, criação, conclusão, atualização } = req.body

        let dia = new Date().getDate()
        let mês = new Date().getMonth()+1
        let ano = new Date().getFullYear()
        let horas = new Date().getHours()
        let minutos = new Date().getMinutes()
        
        if(Number(minutos) <= 9 ) {
                let minutos = `0`+`${minutos}`
            }

        const tarefamento = {
                id: randomUUID(),
                tarefa,
                descrição,
                criação: `${dia}/${mês}/${ano} às ${horas}:${minutos}`,
                atualização: `${dia}/${mês}/${ano} às ${horas}:${minutos}`,
                conclusão: null
        }

        database.inserir('tarefas', tarefamento)

        return res.end('Usuário criado')
        
    }
    },

    {
        method: 'PUT',
        url: fazedordeurl('/tarefas/:id'),
        handler: (req,res) => {
            const {id} = req.parametros
            const {tarefa, descrição, atualização} = req.body
            
            let dia = new Date().getDate()
            let mês = new Date().getMonth()+1
            let ano = new Date().getFullYear()
            let horas = new Date().getHours()
            let minutos = new Date().getMinutes()

            if(Number(minutos) <= 9 ) {
                let minutos = `0`+`${minutos}`
            }

            database.atualizar('tarefas', id, {
                tarefa,
                descrição,
                atualização: `${dia}/${mês}/${ano} às ${horas}:${minutos}`
            })
            
            return res.writeHead(200).end("Atualização concluida!")
        }
    },

    {
        method: 'DELETE',
        url: fazedordeurl('/tarefas/:id'),
        handler: (req,res) => {
            const {id} = req.parametros

            database.deletar('tarefas', id)
            
            return res.writeHead(204).end()
        }
    },

    {
        method: 'PATCH',
        url: fazedordeurl('/tarefas/:id/completea'),
        handler: (req,res) => {
            const {id} = req.parametros
            
            const body = req.body || {}

            database.patchar('tarefas', id, {
                conclusão: `${dia}/${mês}/${ano} às ${horas}:${minutos}`
            })
            
            
            return res.writeHead(200).end("Tarefa concluída com êxito")
        }
    }
]