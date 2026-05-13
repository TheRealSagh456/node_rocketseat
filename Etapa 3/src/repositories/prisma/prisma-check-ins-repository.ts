import type { Prisma, CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "../check-ins-repository.js";
import { prisma } from "../../lib/prisma.js";

export class PrismaCheckInsRepository implements CheckInsRepository {
    
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data,
        })
        return checkIn
    }
    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id,
            }
        })
        return checkIn
    }
    async findByUserIdOnDate(userId: string, date: Date) {
        throw new Error("Method not implemented.");
    }
    async findManyByUserId(userId: string, page: number) {
        throw new Error("Method not implemented.");
    }
    async countByUserId(userId: string) {
        throw new Error("Method not implemented.");
    }
    async save(checkIn: CheckIn) {
        throw new Error("Method not implemented.");
    }

}