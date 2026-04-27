import fastify from 'fastify'
import { knecs } from './database.js'

const app = fastify()

//http://localhost:3333/hello

app.get('/hello', async () => {
    const tables = await knecs('sqlite_schema').select('*')

    return tables
})

app.listen({
    port: 3333,
}).then(()=> {
    console.log('Servidor rodando!')
})