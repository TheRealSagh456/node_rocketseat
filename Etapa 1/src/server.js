// const http = require('http') //Common JS

//CommonJS => require (padrão de importação)

//Atualmente o mais usado são os ESModules
//ESModules (EcmaScript Modules) => import/export
//Por padrão o Node não suporta eles, então pra ele suportá-los, no package.json, criar a linha "type": "module",

import http from 'node:http' //ESModule
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'


//estamos importando Frameworks
//Módulos de terceiros (baixados por fora) e módulos internos são diferentes (os internos pedem o prefiro node:)
// JSON - 


const server = http.createServer(async(req, res) => {
    const {method, url} = req

    await json(req, res) //middleware = interceptador -> req e res são  transformados no json.js

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

   if (route) {
    
    const routeparams = req.url.match(route.path)

    //console.log(extractQueryParams(routeparams.groups.query))

    const {query, ...params} = routeparams.groups

    req.query = query ? extractQueryParams(query) : {}
    req.params = params

    req.params = {... routeparams.groups}


    return route.handler(req, res)
   }
    
    return res.writeHead(404).end('Tem não man')
})
// o req obtem informações (criação de usuário: nome, email, senha) e o res devolve uma resposta pra quem está chamando o servidor

server.listen(3333)
//localhost: 3333