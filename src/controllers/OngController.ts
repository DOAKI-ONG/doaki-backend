import { Request, Response } from "express";
import z from "zod";
import { OngType } from "@prisma/client";
import dotenv from "dotenv";
import OngRepository from "@repositories/OngRepository";
import { OngRegister } from "src/types/ong.types";

dotenv.config();
export default class OngController {
  static async registerOng(body: OngRegister, res: Response) {
    const { cnpj, context, address, name, email, phone } = body;
    const ong = await OngRepository.create({
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
  }
  static async getOngById(req: Request, res: Response) {
    const { id } = res.locals.id;
    const ong = await OngRepository.findById(id);
    return res.status(200).json(ong);
  }
  static async getAllOngs(req: Request, res: Response) {
    const ongs = await OngRepository.findAll();
    return res.status(200).json(ongs);
  }
  static async deleteOng(req: Request, res: Response) {
    const { ong_id } = req.params;
    await OngRepository.delete(ong_id);
    return res.status(200).json({
      message: "Ong deletada com sucesso",
    });
  }
}
