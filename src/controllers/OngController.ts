import { Request, Response } from "express";
import z from "zod";
import { OngType } from "@prisma/client";
import dotenv from "dotenv";
import OngRepository from "@repositories/OngRepository";

dotenv.config();
export default class OngController {
  static async registerOng(req: Request, res: Response) {
    const registerUserSchema = z
      .object({
      name: z.string().min(3).max(255),
      email: z.string().email().min(5).max(255),
      phone: z.string().min(10).max(15),
      cnpj: z.string().min(14).max(14),
      context: z.nativeEnum(OngType),
      address: z.string().min(5).max(255),
      })
      ;
    try {
      const { cnpj, context, address, name, email, phone} =
        registerUserSchema.parse(req.body);
      await OngRepository.create({
        name,
        email,
        cnpj,
        context,
        address,
        phone,
        id_user_fk: res.locals.id,
      });
      return res.status(201).json({
        message: "ONG criado com sucesso",
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
  static async getOngById(req: Request, res: Response) {
    const { id } = res.locals.id;
    try {
      const user = await OngRepository.findById(id);
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
  static async getAllOngs(req: Request, res: Response) {
    try {
      const users = await OngRepository.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }
  static async deleteOng(req: Request, res: Response) {
    const id = res.locals.id;
    try {
      const ong = await OngRepository.findById(id);
      if (!ong) {
        return res.status(404).json({
          message: "Ong não encontrada",
        });
      }
      await OngRepository.delete(id);
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }
}
