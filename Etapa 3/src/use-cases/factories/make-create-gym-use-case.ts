import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository.js"
import { CreateGymUseCase } from "../create-gym.js"

export function makeCreateGymUseCase() {
        
    const gymRepository = new PrismaGymsRepository()
    const useCase = new CreateGymUseCase(gymRepository)

    return useCase
}