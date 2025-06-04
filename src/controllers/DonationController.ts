import DonationRepository from "@repositories/DonationRepository";
import UserRepository from "@repositories/UserRepository";
import { Request, Response } from "express";
import { PaymentCreateRequest } from "src/types/paymentBody.types";

export default class DonationController {
  static async createDonation(req: Request, res: Response) {
    const { cnpj } = req.params;
    const paymentData = req.body as PaymentCreateRequest;
    const payment = await DonationRepository.create(
      cnpj,
      paymentData,
      res.locals.id
    );
    return res.status(201).json(payment);
  }
  static async getAllDonationsByUserId(req: Request, res: Response) {
    const userId = res.locals.id;
    await UserRepository.findById(userId);
    const donations = await DonationRepository.findAllDonationsByUserId(userId);
    return res.status(200).json(donations);
  }
  static async paymentUpdateCard(req: Request, res: Response) {}
  static async paymentUpdatePix(req: Request, res: Response) {}
}
