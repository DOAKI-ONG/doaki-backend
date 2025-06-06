import DonationController from "@controllers/DonationController";
import express from "express";

const DonationPublicRoutes = express.Router();

DonationPublicRoutes.post(
  "/donation/:transactionId/updateStatusPix",
  DonationController.paymentUpdatePix
);

DonationPublicRoutes.post(
  "/donation/:transactionId/payment/updateStatusPix",
  DonationController.paymentUpdatePix
);

export default DonationPublicRoutes;
