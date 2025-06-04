import { createPaymentClient } from "@lib/mercadopago";
import { prisma } from "@lib/prisma";
import { createDonationResponse } from "@services/payment/donationResponse";
import { BodyPayment } from "src/entities/bodyPayment";

export default class DonationRepository {
  static async create(cnpj: string, paymentData: any, idUser: string) {
    const ongExists = await prisma.ong.findFirst({
      where: {
        cnpj: cnpj,
      },
    }); 
    const userExists = await prisma.user.findUnique({
      where: {
        id_user: idUser,
      },
    });

    if (!ongExists) {
      throw new Error("ONG not found");
    }
    const bodyPayment = new BodyPayment(
      paymentData,
      userExists!,
      ongExists!,
    ).body;
    const payment = createPaymentClient(ongExists?.accessToken!);
    const paymentResponse = await payment.create({ body: bodyPayment  });
    const {
      id,
      status_detail,
      date_created,
      date_approved,
      payment_type_id,
      transaction_amount,
    } = paymentResponse;
    const paymentCreated = await prisma.donation.create({
      data: {
        userId: idUser,
        amount: transaction_amount,
        ongId: ongExists.id_ong,
        paymentMpId: id,
        status: status_detail,
        dataCreated: date_created,
        dataApproved: date_approved,
        paymentMethod: payment_type_id,
      },
    });
    if (!paymentCreated) {
      throw new Error("Failed to create donation");
    }
    return paymentCreated;
  }
  static async findAll() {
    return await prisma.donation.findMany({
      include: {
        user: {
          select: {
            id_user: true,
            name: true,
            email: true,
          },
        },
        ong: {
          select: {
            id_ong: true,
            name: true,
            cnpj: true,
          },
        },
      },
    });
  }
  static async findAllDonationsByUserId(id: string) {
    const donation = await prisma.donation.findMany({
      where: {
        userId: id,
      },
      select: {
        ongId: true,
        amount: true,
        paymentMethod: true,
        createdAt: true,
      },
    });
    if (!donation) {
      return [];
    }
    const resBody = await createDonationResponse(donation);
    return resBody;
  }
}
