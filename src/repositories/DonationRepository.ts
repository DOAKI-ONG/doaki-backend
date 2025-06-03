import { createPaymentClient } from "@lib/mercadopago";
import { prisma } from "@lib/prisma";

export default class DonationRepository {
  static async create(cnpj: string, paymentData: any, idUser: string) {
    const ongExists = await prisma.ong.findFirst({
      where: {
        cnpj: cnpj,
      },
    });
    if (!ongExists) {
      throw new Error("ONG not found");
    }
    const payment = createPaymentClient(ongExists?.accessToken!);
    const paymentResponse = await payment.create({ body: paymentData });
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
}
