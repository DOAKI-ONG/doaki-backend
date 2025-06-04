import { Router, Request, Response, NextFunction } from "express";
import { checkToken } from "@middlewares/ensureAuthenticate";
import DonationController from "@controllers/DonationController";


const DonationPrivateRoutes = Router();

DonationPrivateRoutes.post(
  "/ong/:cnpj",
  checkToken,
  async (req: Request, res: Response) => {
    await DonationController.createDonation(req, res);
  }
);


export default DonationPrivateRoutes;
