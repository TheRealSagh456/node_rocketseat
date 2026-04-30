import http from 'node:http'
import { stringify } from 'node:querystring'
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'
import { filtrar } from './utils/filtro.js'

const server = http.createServer(async (req, res) => {
    const {method, url} = req

    await json(req, res)

    const route = routes.find(route => {
    return route.method === method && route.url.test(url)
    })

    if(route) {
        const parametrosderota = req.url.match(route.url);
        req.parametros = {...parametrosderota.groups}       

        const {query, ...parametros} = parametrosderota.groups

        req.parametros = parametros
        req.query = query ? filtrar(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end('Not found')
})
server.listen(3334, ()=>{console.log("Server Rodando")})