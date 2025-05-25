import express from "express";
import { Request, Response } from "express";
import { checkToken } from "@middlewares/ensureAuthenticate";
import { verifyAdminUserRole } from "@middlewares/verifyAdmin";
import { InvalidEmailError } from "@helpers/user-errors/400/invalidEmailError";
import { NameRequiredError } from "@helpers/user-errors/400/nameRequiredError";
import { EmailRequiredError } from "@helpers/user-errors/400/emailRequiredError";
import { registerOngSchema } from "@schemas/Ong.schema";
import OngController from "@controllers/OngController";

const OngPrivateRoutes = express.Router();

OngPrivateRoutes.post(
  "/register",
  checkToken,
  verifyAdminUserRole,
  (req: Request, res: Response) => {
    const validatedBody = validateSchema(req, registerOngSchema);
    OngController.registerOng(validatedBody, res);
  }
);
OngPrivateRoutes.get(
  "/profile",
  checkToken,
  verifyAdminUserRole,
  (req: Request, res: Response) => {
    OngController.getOngById(req, res);
  }
);
OngPrivateRoutes.get(
  "/getAll",
  checkToken,
  verifyAdminUserRole,
  (req: Request, res: Response) => {
    OngController.getAllOngs(req, res);
  }
);
OngPrivateRoutes.patch(
  "/delete/:ong_id",
  checkToken,
  verifyAdminUserRole,
  (req: Request, res: Response) => {
    OngController.deleteOng(req, res);
  }
);

function validateSchema(req: Request, schema: any) {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.erros[0];
    if (errors.message == "Incorrect format for email") {
      throw new InvalidEmailError();
    }
    if (errors.message == "Name is required") {
      throw new NameRequiredError();
    }
    if (errors.message == "Email is required") {
      throw new EmailRequiredError();
    }
    throw new Error(`Internal server error`);
  }
  return result.data;
}

export default OngPrivateRoutes;
