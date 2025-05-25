import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { UserLogin, UserRegister } from "src/types/user.types";
import { UserNotFoundError } from "@helpers/user-errors/404/userNotFoundError";
import { checkPassword } from "@services/users/checkPassword";
import { PasswordNotMatchError } from "@helpers/user-errors/400/passwordNotMatchError";

dotenv.config();
export default class UserController {
  static async loginUser(body: UserLogin, res: Response) {
    const { email, password } = body;
    const userExists = await UserRepository.findByEmail(email);
    if (!(await (checkPassword(password, userExists.password)))) {
     throw new PasswordNotMatchError();
    }
    const token = jsonwebtoken.sign(
      {
        id: userExists?.id_user,
      },
      String(process.env.SECRET),
      {
        expiresIn: "12h",
      }
    );
    return res.status(201).json({
      message: "Usuário logado com sucesso",
      token: token,
    });
  }

  static async registerUser(body: UserRegister, res: Response) {
    const { name, email, password, cpf } = body;
    await UserRepository.create({
      name,
      email,
      password,
      cpf,
      type: "DONATOR",
    });
    return res.status(201).json({
      message: "Usuário cadastrado com sucesso",
    });
  }
  static async getUserById(req: Request, res: Response) {
    const { id } = res.locals.id;
    const user = await UserRepository.findById(id);
    return res.status(200).json({
      user: { name: user.name, email: user.email, phone: user.phone },
    });
  }
  static async getAllUsers(req: Request, res: Response) {
    const users = await UserRepository.findAll();
    return res.status(200).json(users);
  }
}
