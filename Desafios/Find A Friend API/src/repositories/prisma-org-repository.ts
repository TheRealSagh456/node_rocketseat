import type { Prisma } from '@prisma/client';
import type { OrgRepository } from '../Interfaces/Org-interface.js';
import { prisma } from '../lib/prisma.js';

export class PrismaOrgsRepository implements OrgRepository {
    async create(data: Prisma.OrgCreateInput) {
        const org = await prisma.org.create({
            data,
        })

        return org
    }
    async findByEmail(email: string) {
        const orgWithEmail = await prisma.org.findUnique({
            where: {
                email: email
            }
        })

        return orgWithEmail
    }

}