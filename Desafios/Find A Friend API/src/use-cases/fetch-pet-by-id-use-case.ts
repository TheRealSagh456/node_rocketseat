import type { PetRepository } from "../Interfaces/Pet-Interface.js"

type FetchPetByIdRequest = {
    id: string
}

export class FetchPetByIdUseCase {
    constructor(private petRepository: PetRepository) {}

    async execute(id: FetchPetByIdRequest) {

    const foundedPet = await this.petRepository.findById(id.id)

    if(!foundedPet) {
        throw new Error("Pet not found.")
    }
    return foundedPet
    }
}