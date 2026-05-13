import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository.js"
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms.js"

export function makeFetchNearbyGymsUseCase() {
        
    const gymsInsRepository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymsUseCase(gymsInsRepository)

    return useCase
}