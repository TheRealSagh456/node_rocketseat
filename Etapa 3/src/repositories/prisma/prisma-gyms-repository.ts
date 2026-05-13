import type { Gym, Prisma } from "@prisma/client";
import type { FindManyNearbyParams, GymsRepository } from "../gyms-repository.js";
import { prisma } from "../../lib/prisma.js";
import { getDistanceBetweenCoordinates } from "../../use-cases/utils/get-distance-between-coordinates.js";

export class PrismaGymsRepository implements GymsRepository {
    
    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            }
        })
        return gym    
    }
    
    async findManyNearby({latitude, longitude}: FindManyNearbyParams) {
        
         const gyms = await prisma.gym.findMany()

  return gyms.filter((gym) => {
    const distance = getDistanceBetweenCoordinates(
      { latitude, longitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    return distance < 10
  })
}
    
    
    async searchMany(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                }
            },
            take: 20,
            skip: (page-1) * 20
        })
        return gyms
    }
    
    async create(data: Prisma.GymCreateInput){
        const gym = await prisma.gym.create({
            data,
        })

        return gym
    }

}