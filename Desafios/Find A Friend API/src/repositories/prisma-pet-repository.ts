import type { Prisma } from "@prisma/client";
import type { PetRepository } from "../Interfaces/Pet-Interface.js";
import { prisma } from "../lib/prisma.js";

export class PrismaPetRepository implements PetRepository {
    async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
        data
    })
    return pet
}

}