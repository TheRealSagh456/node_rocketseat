import { compare } from "bcryptjs"
import type { OrgRepository } from "../Interfaces/Org-interface.js"

type OrgCredencials = {
    email: string
    password: string
}

export class AuthenticateOrgUseCase {
    constructor(private orgRepository: OrgRepository) {}

    async execute({email, password}: OrgCredencials) {

        const orgWithEmail = await this.orgRepository.findByEmail(email)
        
        if(!orgWithEmail) {
            throw new Error('Credenciais Incorretas!')
        }

        const isPasswordValid = await compare(password, orgWithEmail.password_hash)

        if(!isPasswordValid) {
            throw new Error('Credenciais Incorretas!')
        }   

        return orgWithEmail
        
    }

}