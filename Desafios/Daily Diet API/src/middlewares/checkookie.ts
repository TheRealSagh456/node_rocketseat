import { FastifyReply, FastifyRequest } from "fastify"

export async function check(request: FastifyRequest, reply: FastifyReply) { 
    
    const sessionID = request.cookies.sessionID
    
    if(!sessionID) {
    
        return reply.status(401).send("Usuário não encontrado, acesso não autorizado!")
    
    }}