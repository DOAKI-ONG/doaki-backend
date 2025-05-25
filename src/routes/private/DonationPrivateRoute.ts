import { Router, Request, Response, NextFunction } from "express";
import { checkToken } from "@middlewares/ensureAuthenticate";
import { verifyAdminUserRole } from "@middlewares/verifyAdmin";
import DonationController from "@controllers/DonationController";

const DonationPrivateRoutes = Router();

//criar doação, passando o id da ong como parametro e montar o body no frontend
DonationPrivateRoutes.post(
  "/donation/", (req: Request, res: Response) => {
    DonationController.createDonation(req, res);
  })



export default DonationPrivateRoutes;