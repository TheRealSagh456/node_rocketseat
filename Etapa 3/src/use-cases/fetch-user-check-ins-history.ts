import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "../repositories/check-ins-repository.js";


interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string
    page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}


export class FetchUserCheckInsHistoryUseCase {
    constructor(private CheckInsRepository: CheckInsRepository) {}

    async execute({userId, page}: FetchUserCheckInsHistoryUseCaseRequest): Promise <FetchUserCheckInsHistoryUseCaseResponse> {

        const checkIns = await this.CheckInsRepository.findManyByUserId(userId, page)

        return {
            checkIns,
        }
    }
}