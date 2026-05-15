import type { Age, Energy, Petsize, IndependencyLevel } from "@prisma/client";
import type { PetRepository } from "../Interfaces/Pet-Interface.js"

type FetchPetsByCityRequest = {
city: string, 
age?: Age,
energy?: Energy; 
size?: Petsize; 
independency?: IndependencyLevel
}

export class FetchPetsByCityUseCase {
    constructor(private petRepository: PetRepository) {}

    async execute({city, age, energy, size, independency}: FetchPetsByCityRequest) {

    const petsInCity = await this.petRepository.findManyByQuery({
        city,
            ...(age && { age }),
            ...(energy && { energy }),
            ...(size && { size }),
            ...(independency && { independency }),
        }) 

        return {pets: petsInCity}
    }
}