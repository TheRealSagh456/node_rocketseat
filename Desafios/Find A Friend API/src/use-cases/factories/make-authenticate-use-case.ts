import { PrismaOrgsRepository } from "../../repositories/prisma-org-repository.js"
import { AuthenticateOrgUseCase } from "../authenticate-org-use-case.js"

export async function makeAuthenticateUseCase() {

    const prismaOrgsRepository = new PrismaOrgsRepository()
    const authenticateOrg = new AuthenticateOrgUseCase(prismaOrgsRepository)

    return authenticateOrg
}