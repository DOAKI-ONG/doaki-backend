import UserRepository from "@repositories/UserRepository";

import { NextFunction, Request, Response } from "express";
import { UserInactiveError } from "@helpers/user-errors/423/UserInactiveError";
export async function ensureActiveUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let user;
  //Está tentando logar/cadastrar com email
  if (!res.locals.id && req.body) {
    const email = req.body.email;
    console.log("EnsureActiveUser middleware called with email:", email);
    user = await UserRepository.findByEmail(email);
  } 
  //Está tentando editar algo.
  if(res.locals.id && req.body) {
    const id = res.locals.id;
    user = await UserRepository.findById(id);
  }
  //Está fazendo algo que não tem body.
  if(res.locals.id && !req.body) {
    const id = res.locals.id;
    user = await UserRepository.findById(id);
  }
  if (!user!.status) {
    throw new UserInactiveError();
  }
  next();
}
