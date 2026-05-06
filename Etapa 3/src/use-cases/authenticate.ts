import { compare } from "bcryptjs";
import type { UsersRepository } from "../repositories/users-repository.js";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";
import type { User } from "@prisma/client";

interface AutenticateUseCaseRequest {
    email: string
    password: string
}

interface AutenticateUseCaseResponse {
    user: User
}


export class AuthenticateUseCase {
    constructor(private Usersrepository: UsersRepository) {}

    async execute({email, password}: AutenticateUseCaseRequest): Promise <AutenticateUseCaseResponse> {
        const user = await this.Usersrepository.findByEmail(email)

        if(!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMathes = await compare(password, user.password_hash)

        if(!doesPasswordMathes) {
            throw new InvalidCredentialsError()
        }

        return {
            user,
        }
    }
}