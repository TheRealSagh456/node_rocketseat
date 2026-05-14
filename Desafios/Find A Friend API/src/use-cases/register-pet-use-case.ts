import type { Age, AmbientSpace, Energy, IndependencyLevel, Petsize, Requirement } from "@prisma/client"
import type { PetRepository } from "../Interfaces/Pet-Interface.js"

type RegisterPetRequest = {
    org_id: string
    org: string
    name: string
    age: Age
    about: string
    energy: Energy
    independency: IndependencyLevel
    ambient: AmbientSpace
    size: Petsize
    requirements?: string[]

    
}

export class PetRegisterUseCase {

    constructor(private petRepository: PetRepository) {}

    async execute({org_id, name, age, about, energy, independency, ambient, size, requirements}: RegisterPetRequest) {


        const antiUndefinedPet = {
            org: {connect: {
            id: org_id
            }},
            name, 
            age, 
            about, 
            energy, 
            independency, 
            ambient, 
            size,
            ...(requirements && {
                requirements: {
                    create: requirements.map((requirement) => ({
                        text: requirement
                    }))
                }
            }),

        }

            const pet = await this.petRepository.create(antiUndefinedPet)
        
            return pet
        }
}