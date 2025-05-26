import { User } from "@prisma/client";
import { Donation } from "@prisma/client";
import { OngType } from "@prisma/client";
export type Ong = {
    id: string;
    user?: User;
    cnpj?: string;
    context: OngType;
    address: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    donation: Donation[];
};
export type OngRegister = {
    cnpj: string;
    context: OngType;
    address: string;
    description: string;
    email: string;
    name: string;
    phone: string;
    id_user_fk: string;
};
export type OngUpdate = {
    cnpj?: string;
    context?: OngType;
    address?: string;
    status?: boolean;
};