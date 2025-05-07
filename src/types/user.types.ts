import { Perfil } from "@prisma/client";
import { Donation } from "@prisma/client";
import { Ong } from "@prisma/client";
export type User = {
    id: string;
    name: string;
    email: string;
    cpf?: string;
    phone?: string;
    address?: string;
    password: string;
    type: Perfil;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    donation: Donation[];
    ong?: Ong;
};
export type UserLogin = {
    email: string;
    password: string;
};
export type UserRegister = {
    name: string;
    email: string;
    password: string;
};
export type UserUpdate = {
    name?: string;
    email?: string;
    password?: string;
    cpf?: string;
    phone?: string;
    address?: string;
};
export type UserUpdatePassword = {
    password: string;
    newPassword: string;
};





