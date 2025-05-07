import { User } from "@prisma/client";
import { Ong } from "@prisma/client";
export interface Donation {
    id: string;
    userId: string;
    ongId: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    user: User; 
    ong: Ong;   
}
export interface DonationCreate {
    userId: string;
    ongId: string;
    amount: number;
}