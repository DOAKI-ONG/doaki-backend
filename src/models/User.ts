import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return prisma.user.create({
        data,
    });
}

export async function findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: { email },
    });
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    return prisma.user.update({
        where: { id },
        data,
    });
}

export async function deleteUser(id: string): Promise<User> {
    return prisma.user.delete({
        where: { id },
    });
}