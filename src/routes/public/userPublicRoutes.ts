import UserController from "@controllers/UserController";
import { CpfRequiredError } from "@helpers/user-errors/400/cpfRequiredError";
import { EmailRequiredError } from "@helpers/user-errors/400/emailRequiredError";
import { InvalidConfirmPasswordError } from "@helpers/user-errors/400/invalidConfirmPassword";
import { InvalidCpfError } from "@helpers/user-errors/400/invalidCpfError";
import { InvalidEmailError } from "@helpers/user-errors/400/invalidEmailError";
import { InvalidPasswordError } from "@helpers/user-errors/400/invalidPasswordError";
import { NameRequiredError } from "@helpers/user-errors/400/nameRequiredError";
import { PasswordNotMatchError } from "@helpers/user-errors/400/passwordNotMatchError";
import { loginUserSchema, registerUserSchema } from "@schemas/User.schema";
import express from "express";
import { Request, Response } from "express";
import { z, ZodError } from "zod";

const UserPublicRoutes = express.Router();

UserPublicRoutes.post("/login", (req: Request, res: Response) => {
  const validatedBody = validateSchema(req, loginUserSchema);
  UserController.loginUser(validatedBody, res);
});
UserPublicRoutes.post("/register", (req: Request, res: Response) => {
   const validatedBody = validateSchema(req, registerUserSchema);
  UserController.registerUser(validatedBody, res);
});

function validateSchema(req: Request, schema: z.ZodSchema) {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    if(result.error instanceof ZodError) {
    const errors = result.error.errors[0];
    if (errors.message == "Mismatched password") {
      throw new PasswordNotMatchError();
    }
    if (errors.message == "Incorrect format for email") {
      throw new InvalidEmailError();
    }
    if (errors.message == "Name is required") {
      throw new NameRequiredError();
    }
    if (errors.message == "Password with lenght 8 is required") {
      throw new InvalidPasswordError();
    }
    if (errors.message == "Confirm password with lenght 8 is required") {
      throw new InvalidConfirmPasswordError();
    }
    if (errors.message == "Email is required") {
      throw new EmailRequiredError();
    }
    if (errors.message == "CPF is required") {
      throw new CpfRequiredError();
    }
    if (errors.message == "CPF must be 11 digits" || errors.message == "Invalid CPF") {
      throw new InvalidCpfError();
    }
  }
    throw new Error(`Internal server error`);
  }
  return result.data;
}

export default UserPublicRoutes;
