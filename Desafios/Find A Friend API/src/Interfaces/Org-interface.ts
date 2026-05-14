import { Prisma } from "@prisma/client"

export interface ORG {
    id: string
    name: string
    email: string
    address: string
    phone: string
    password_hash: string
    city: string
    created_at: Date
    updated_at?: Date
}

export interface OrgRepository {
    create(data: Prisma.OrgCreateInput) : Promise <ORG>
    findByEmail(email: string): Promise <ORG | null>
}