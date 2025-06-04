import UserController from "@controllers/UserController";
import express from "express";
import { Request, Response } from "express";
import { checkToken } from "@middlewares/ensureAuthenticate";
import { verifyAdminUserRole } from "@middlewares/verifyAdmin";
import { z, ZodError } from "zod";
import { editUserSchema } from "@schemas/User.schema";
import { UserEditRequestError } from "@helpers/user-errors/400/userEditRequestError";
import { User } from "mercadopago";
const UserPrivateRoutes = express.Router();

UserPrivateRoutes.get(
  "/profile/",
  checkToken,
  async (req: Request, res: Response) => {
    await UserController.getUserById(req, res);
  }
);
UserPrivateRoutes.get(
  "/getAll",
  checkToken,
  verifyAdminUserRole,
  async (req: Request, res: Response) => {
    await UserController.getAllUsers(req, res);
  }
);
UserPrivateRoutes.delete(
  "/delete",
  checkToken,
  async (req: Request, res: Response) => {
    await UserController.deleteUser(req, res);
  }
);
UserPrivateRoutes.patch(
  "/edit",
  checkToken,
  async (req: Request, res: Response) => {
    const validatedBody = validateSchema(req, editUserSchema);
    await UserController.editUser(validatedBody, res);
  }
);

UserPrivateRoutes.get(
  "/donations/getAll",
  checkToken,
  async (req: Request, res: Response) => {
    await UserController.getAllDonationsByUserId(req, res);
  }
);

function validateSchema(req: Request, schema: z.ZodSchema) {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    if (result.error instanceof ZodError) {
      const error = result.error.errors[0];
      throw new UserEditRequestError(error.message);
    }
    throw new Error(`Internal server error`);
  }
  return result.data;
}

export default UserPrivateRoutes;
