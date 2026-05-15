import type { Age, Energy, IndependencyLevel, Petsize, Prisma } from "@prisma/client";
import type { Pet, PetRepository } from "../Interfaces/Pet-Interface.js";
import { prisma } from "../lib/prisma.js";

export class PrismaPetRepository implements PetRepository {
    
    async findById(id: string) {
    
        const petById = await prisma.pet.findUnique({
            where: {
                id,
            },
            include: {
                org: {
                    select: {
                        name: true,
                        city: true,
                        phone: true,
                    }
                },
                requirements: true
            }
        })
        return petById

    }
    
    async findManyByQuery(params: { city: string, age?: Age, energy?: Energy, size?: Petsize, independency?: IndependencyLevel }) {
        
        const petByQuery = await prisma.pet.findMany({
                where: {
                org: {
                    city: {
                        contains: params.city,
                    }
                },
                ...(params.age ? { age: params.age } : {}),
                ...(params.energy ? { energy: params.energy } : {}),
                ...(params.size ? { size: params.size } : {}),
                ...(params.independency ? { independency: params.independency } : {}),
            },
            include: {
                org: {
                    select: {
                        name: true,
                        phone: true,
                    }
                }
            }
        })
        return petByQuery
    }

    async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
        data
    })
    return pet
}
    
}