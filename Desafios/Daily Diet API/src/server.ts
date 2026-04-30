import { app } from "./app"
import {RR} from './routes/routes'
import fastifyCookie from '@fastify/cookie'

app.register(RR)
app.register(fastifyCookie)

app.listen({
    port: 3333
}).then(() => {
    console.log('Servidor Rodando!')
})