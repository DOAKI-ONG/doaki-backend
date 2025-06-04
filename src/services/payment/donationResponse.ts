import { Donation } from "@prisma/client";
import OngRepository from "@repositories/OngRepository";

export function createDonationResponse(donation: Partial<Donation>[]) {
return Promise.all(
    donation.map(async (donation) => {
        const ong = await OngRepository.findById(donation.ongId!);
        return {
            amount: donation.amount,
            paymentMethod: donation.paymentMethod,
            dataCreated: donation.createdAt,
            name: ong.name,
        };
    })
);
}
