import { Router, Request, Response, NextFunction } from "express";
import { checkToken } from "@middlewares/ensureAuthenticate";
import DonationController from "@controllers/DonationController";
import z from "zod";
import { paymentSchema } from "@schemas/Payment.schema";

const DonationPrivateRoutes = Router();

DonationPrivateRoutes.post(
  "/ong/:cnpj",
  checkToken,
  async (req: Request, res: Response) => {
    const validatedBody = validateSchema(req, paymentSchema);
    await DonationController.createDonation(req, res, validatedBody);
  }
);

function validateSchema(req: Request, schema: z.ZodSchema) {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    if (result.error instanceof z.ZodError) {
      const errors = result.error.errors[0];
      console.log("Validation Error:", errors);
      throw new Error(errors.message); //erro de pagamento body
    }
    throw new Error();
  }
  return result.data;
}

export default DonationPrivateRoutes;
