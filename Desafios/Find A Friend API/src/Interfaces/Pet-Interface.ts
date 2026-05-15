import type { Age, AmbientSpace, Energy, IndependencyLevel, Petsize, Prisma, Requirement } from "@prisma/client"

export interface Pet {
    name: string
    age: Age
    about: string
    energy: Energy
    independency: IndependencyLevel
    ambient: AmbientSpace
    size: Petsize
    requirements?: Requirement[]
}

export interface PetRepository {
    create(data: Prisma.PetCreateInput): Promise<Pet>
    findManyByQuery(params: { city: string, age?: Age, energy?: Energy, size?: Petsize, independency?: IndependencyLevel }): Promise <Pet[]>
    findById(id: string): Promise <Pet|null>
}