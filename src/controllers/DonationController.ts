import DonationRepository from '@repositories/DonationRepository';
import { Request, Response } from 'express';

export default class DonationController {
  static async createDonation(req: Request, res: Response, validatedBody: any) {
    const { cnpj } = req.params;
    const paymentData  = req.body;
    const payment = await DonationRepository.create(cnpj, paymentData, res.locals.id);
    return res.status(201).json(payment);
  }
  static async paymentUpdateCard(req: Request, res: Response) {}
  static async paymentUpdatePix(req: Request, res: Response) {}
}
