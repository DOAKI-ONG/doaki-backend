import UserController from "@controllers/UserController";
import { UserRegisterRequestError } from "@helpers/user-errors/400/userRegisterRequestError";
import { ensureActiveUser } from "@middlewares/EnsureActive";
import { loginUserSchema, registerUserSchema } from "@schemas/User.schema";
import express from "express";
import { Request, Response } from "express";
import { z } from "zod";

const UserPublicRoutes = express.Router();



UserPublicRoutes.post("/login", ensureActiveUser, async (req: Request, res: Response) => {
  const validatedBody = validateSchema(req, loginUserSchema);
  await UserController.loginUser(validatedBody, res);
});
UserPublicRoutes.post("/register", async (req: Request, res: Response) => {
  const validatedBody = validateSchema(req, registerUserSchema);
  await UserController.registerUser(validatedBody, res);
});

function validateSchema(req: Request, schema: z.ZodSchema) {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    if (result.error instanceof z.ZodError) {
      const error = result.error.errors[0];
      throw new UserRegisterRequestError(error.message);
    }
    throw new Error(`Internal server error`);
  }
  return result.data;
}

export default UserPublicRoutes;
