import { hash } from "bcryptjs";
import type { OrgRepository } from "../Interfaces/Org-interface.js";

type RegisterOrgRequest = {
    name: string 
    email: string
    password: string 
    address: string 
    phone: string 
    city: string
}


export class RegisterOrgUseCase {

    constructor(private orgRepository: OrgRepository) {}

    async execute({name, email, password, address, phone, city}: RegisterOrgRequest) {

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if(orgWithSameEmail) {
        throw new Error('Email já existente')
    }

    const password_hash = (await hash(password, 4)).toString()

        const org = await this.orgRepository.create({
            name,
            password_hash,
            address,
            phone,
            city,
            email,
            created_at: new Date()
        })
    
        return org
    }
}
