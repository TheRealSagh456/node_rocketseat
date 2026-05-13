import z from "zod"
import type { FastifyRequest, FastifyReply } from "fastify"
import { makeCreateGymUseCase } from "../../../use-cases/factories/make-create-gym-use-case.js"
import { CheckInUseCase } from "../../../use-cases/check-in.js"
import { makeCheckInUseCase } from "../../../use-cases/factories/make-check-in-use-case.js"
import { ValidateCheckInUseCase } from "../../../use-cases/validate-check-in.js"

export async function validate(request: FastifyRequest, reply: FastifyReply) {

    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid()
    }) 

    

    const {checkInId} = validateCheckInParamsSchema.parse(request.params)

        const validateCheckInUseCase = ValidateCheckInUseCase()
        
        await checkInUseCase.execute({
            gymId,
            userId: request.user.sub,
            userLatitude: latitude,
            userLongitude: longitude
        })

    return reply.status(200).send()
}