import z from "zod"
import type { FastifyRequest, FastifyReply } from "fastify"
import { makeFetchUserCheckInHisotryUseCase } from "../../../use-cases/factories/make-fetch-user-check-ins-history-use-case.js"

export async function search(request: FastifyRequest, reply: FastifyReply) {

    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryQuerySchema.parse(request.query)

        const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInHisotryUseCase()
        
       const checkIns = await fetchUserCheckInsHistoryUseCase.execute({
            userId: request.user.sub,
            page,  
        })

    return reply.status(200).send({
        checkIns,
    })
}