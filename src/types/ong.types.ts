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
    profileImage: string;
    accessToken: string;
    publicKey: string;
    refreshToken: string;
    expiresIn: number;

};
export type OngUpdate = {
    cnpj?: string;
    context?: OngType;
    address?: string;
    status?: boolean;
};