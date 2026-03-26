import { buildroutepath } from "../utils/build-route-path.js"
import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildroutepath ('/users'),
        handler: (req, res) => {
        
            const { search } = req.query
        
            const users = database.select('users', search ? {
                nome: search,
                email: search,
            } : null)
        
     
           return res.end(JSON.stringify(users)) //retornando em JSON  
        }
    },
{
        method: 'POST',
        path: buildroutepath ('/users'),
        handler: (req, res) => {
              
            console.log(req.query)

           const {nome, email} = req.body

            const user = {
                id: randomUUID(),
                nome,
                email,
            }

            database.insert('users', user)

            return res.writeHead(201).end()
        }

        
    },
    {
        method: 'DELETE',
        path: buildroutepath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('users', id)
            
            return res.writeHead(204).end()
        }
    }
]
