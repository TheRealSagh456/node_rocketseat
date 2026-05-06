import { compare } from "bcryptjs";
import type { UsersRepository } from "../repositories/users-repository.js";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";
import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "../repositories/check-ins-repository.js";
import { error } from "node:console";
import type { GymsRepository } from "../repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface CheckInUseCaseRequest {
    userId: string
    gymId:  string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}


export class CheckInUseCase {
    constructor(
        private CheckInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ) {}

    async execute({userId, gymId}: CheckInUseCaseRequest): Promise <CheckInUseCaseResponse> {

        const gym = await this.gymsRepository.findById(gymId)

        if(!gym) {
            throw new ResourceNotFoundError()
        }

        //calculos calculos calculos
        // if >100m ERROR

        const checkInOnSameDay = await this.CheckInsRepository.findByUserIdOnDate(userId, new Date())
       
        if(checkInOnSameDay) {
            throw new Error()
        }

        const checkIn = await this.CheckInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return {
            checkIn,
        }
    }
}