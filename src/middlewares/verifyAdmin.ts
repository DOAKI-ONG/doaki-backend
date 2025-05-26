import { Perfil } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import UserRepository from "@repositories/UserRepository";
import { UserNotAuthorizedError } from "@helpers/user-errors/401/userNotAuthorizedError";

export async function verifyAdminUserRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = res.locals.id;

  const response = await UserRepository.findById(id)

  if (response?.type !== Perfil.ADMIN) {
    throw new UserNotAuthorizedError()
  }

  next();
}
