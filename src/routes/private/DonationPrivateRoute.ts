import { Router, Request, Response, NextFunction } from "express";
import { checkToken } from "@middlewares/ensureAuthenticate";
import DonationController from "@controllers/DonationController";
import { ensureActiveUser } from "@middlewares/EnsureActive";


const DonationPrivateRoutes = Router();

DonationPrivateRoutes.post(
  "/ong/:cnpj",
  checkToken,
  ensureActiveUser,
  async (req: Request, res: Response) => {
    await DonationController.createDonation(req, res);
  }
);


DonationPrivateRoutes.get(
  "/user/getAll",
  checkToken,
  ensureActiveUser,
  async (req: Request, res: Response) => {
    await DonationController.getAllDonationsByUserId(req, res);
  }
);


export default DonationPrivateRoutes;
