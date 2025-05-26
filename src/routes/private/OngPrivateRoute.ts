import express from "express";
import { Request, Response } from "express";
import { checkToken } from "@middlewares/ensureAuthenticate";
import { verifyAdminUserRole } from "@middlewares/verifyAdmin";
import { editOngSchema, registerOngSchema } from "@schemas/Ong.schema";
import OngController from "@controllers/OngController";
import { OngRegisterError } from "@helpers/ong-errors/400/ongRegisterError";
import { ZodError } from "zod";

const OngPrivateRoutes = express.Router();

OngPrivateRoutes.post(
  "/register",
  checkToken,
  verifyAdminUserRole,
  async (req: Request, res: Response) => {
    const validatedBody = validateSchema(req, registerOngSchema);
    await OngController.registerOng(validatedBody, res);
  }
);
OngPrivateRoutes.get(
  "/profile",
  checkToken,
  verifyAdminUserRole,
  async (req: Request, res: Response) => {
    await OngController.getOngById(req, res);
  }
);
OngPrivateRoutes.get(
  "/getAll",
  checkToken,
  verifyAdminUserRole,
  async (req: Request, res: Response) => {
    await OngController.getAllOngs(req, res);
  }
);
OngPrivateRoutes.get(
  "/users/getAll/",
  checkToken,
  async (req: Request, res: Response) => {
    await OngController.getAllOngsForUsers(res);
  }
);
OngPrivateRoutes.delete(
  "/delete/:ong_id",
  checkToken,
  verifyAdminUserRole,
  async (req: Request, res: Response) => {
    await OngController.deleteOng(req, res);
  }
);

OngPrivateRoutes.patch(
  "/edit/:ong_id",
  checkToken,
  verifyAdminUserRole,
  async (req: Request, res: Response) => {
    const validatedBody = validateSchema(req, editOngSchema);
    await OngController.editOng(validatedBody, req,  res);
  }
);
function validateSchema(req: Request, schema: any) {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    if (result.error instanceof ZodError) {
      const errors = result.error.errors[0];
      throw new OngRegisterError(errors.message);
    }
    throw new Error(`Internal server error`);
  }
  return result.data;
}

export default OngPrivateRoutes;
