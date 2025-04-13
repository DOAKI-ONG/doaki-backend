import { Request, Response } from "express";
import z from "zod";
import UserRepository from "../repositories/UserRepository";
export default class UserController {
  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    res.send("User logged in");
  }
  static async registerUser(req: Request, res: Response) {
    const registerUserSchema = z
      .object({
        name: z.string(),
        email: z.string().email("Email com formato inválido"),
        password: z
          .string()
          .min(8, "A senha deve conter pelo menos 8 caracteres"),
        confirm_password: z.string(),
      })
      .refine((data) => data.password === data.confirm_password, {
        message: "As senhas divergem",
        path: ["confirm_password"],
      });
    const { name, email, password } = registerUserSchema.parse(req.body);
    try {
      await UserRepository.create({
        name,
        email,
        password,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Usuário já existe") {
          return res.status(409).json({
            message: error.message,
          });
        }
      }
    }
    return res.status(201).json({
      message: "Usuário criado com sucesso",
    });
  }
}
