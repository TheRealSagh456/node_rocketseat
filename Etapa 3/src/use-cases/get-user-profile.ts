import { compare } from "bcryptjs";
import type { UsersRepository } from "../repositories/users-repository.js";
import type { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}


export class GetUserProfileUseCase {
    constructor(private Usersrepository: UsersRepository) {}

    async execute({userId}: GetUserProfileUseCaseRequest): Promise <GetUserProfileUseCaseResponse> {
        const user = await this.Usersrepository.findById(userId)

        if(!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user,
        }
    }
}