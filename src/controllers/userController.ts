import { Request, Response } from "express";
import z from "zod";
import UserRepository from "../repositories/UserRepository";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { encryptPassword } from "src/services/users/encryptPassword";
import { checkPassword } from "src/services/users/checkPassword";

dotenv.config();
export default class UserController {
  static async loginUser(req: Request, res: Response) {
    const loginUserSchema = z.object({
      email: z.string().email("Email com formato inválido"),
      password: z
        .string()
        .min(8, "A senha deve conter pelo menos 8 caracteres"),
    });
    try {
      loginUserSchema.parse(req.body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Erro de validação dos dados",
          errors: error.errors,
        });
      }
    }
    const { email, password } = req.body;
    const userExists = await UserRepository.findByEmail(email);
    if (!userExists || !userExists.status) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }
    const password_encrypted = userExists.password || "";

    const check_password = await checkPassword(password, password_encrypted);
    if (!check_password) {
      return res.status(403).send("Senha inválida!");
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

  static async registerUser(req: Request, res: Response) {
    const registerUserSchema = z
      .object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email("Email com formato inválido"),
        confirm_email: z.string().email("Email com formato inválido"),
        password: z
          .string()
          .min(8, "A senha deve conter pelo menos 8 caracteres"),
        confirm_password: z.string(),
      })
      .refine((data) => data.password === data.confirm_password, {
        message: "As senhas divergem",
        path: ["confirm_password"],
      })
      .refine((data) => data.email === data.confirm_email, {
        message: "Os emails divergem",
        path: ["confirm_email"],
      });
    try {
      const { first_name, last_name, email, password } =
        registerUserSchema.parse(req.body);
      const name = `${first_name} ${last_name}`;
      const password_encrypted = await encryptPassword(password);
      await UserRepository.create({
        name,
        email,
        password: password_encrypted,
        type: "DONATOR",
      });
      return res.status(201).json({
        message: "Usuário criado com sucesso",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Erro de validação dos dados",
          errors: error.errors,
        });
      }
      if (error instanceof Error) {
        return res.status(409).json({
          message: error.message,
        });
      }
    }
    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
  static async getUserById(req: Request, res: Response) {
    const { id } = res.locals.id;
    try {
      const user = await UserRepository.findById(id);
      if (!user) {
        return res.status(404).json({
          message: "Usuário não encontrado",
        });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }
  static async deleteUser(req: Request, res: Response) {
    const id = res.locals.id;
    try {
      const user = await UserRepository.findById(id);
      if (!user) {
        return res.status(404).json({
          message: "Usuário não encontrado",
        });
      }
      await UserRepository.delete(id);
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
    return res.status(200).json({
      message: "Usuário deletado com sucesso",
    });
  }
  static async updateUser(req: Request, res: Response) {
    const updateUserSchema = z.object({
      email: z.string().email("Email com formato inválido").optional(),
      phone: z.string().optional(),
    });
    const id  = res.locals.id;
    const { email, phone } = updateUserSchema.parse(req.body);
    const userExists = await UserRepository.findById(id);
    if (!userExists) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }
    try {
      const user = await UserRepository.update(id, {
        email,
        phone,
      });
      return res.status(200).json({
        message: "Usuário atualizado com sucesso"
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
}
}

