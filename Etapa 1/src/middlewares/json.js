export async function json ( req , res) {

         const buffers = []

    //await => aguarda cada pedaço da stream ser retornado
    for await(const chunk of req) {
        buffers.push(chunk)
    }

try{
        req.body = JSON.parse(Buffer.concat(buffers).toString())

} catch{
        req.body= null
}
res.setHeader('Content-type', 'application/JSON')
}