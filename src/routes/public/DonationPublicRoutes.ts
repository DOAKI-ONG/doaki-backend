import express from "express";

const DonationPublicRoutes = express.Router();

//alocar o notificationurl do webhook do mercadopago
DonationPublicRoutes.post(
  "/donation/:transactionId/updateStatusPix",
  DonationController.paymentUpdatePix
);
//alocar o notificationurl do webhook do mercadopago
DonationPublicRoutes.post(
  "/donation/:transactionId/payment/updateStatusPix",
  DonationController.paymentUpdatePix
);

export default DonationPublicRoutes;
