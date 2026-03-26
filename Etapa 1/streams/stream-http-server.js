import http from 'node:http'
import { Transform } from 'node:stream'

class inverternumerostream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformado = Number(chunk.toString()) * -1

        console.log(transformado)
        
        callback(null, Buffer.from(String(transformado)))
    }
}

const server = http.createServer(async(req, res) => {
    const buffers = []

    //await => aguarda cada pedaço da stream ser retornado
    for await(const chunk of req) {
        buffers.push(chunk)
    }

    const fullstreamcontent = Buffer.concat(buffers).toString()

    console.log(fullstreamcontent)

    return res.end(fullstreamcontent)

   // return req.pipe(new inverternumerostream()).pipe(res)
    
})

server.listen(3335)