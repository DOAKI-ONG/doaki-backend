import { Request, Response } from "express";
import dotenv from "dotenv";
import OngRepository from "@repositories/OngRepository";
import { OngRegister, OngUpdate } from "src/types/ong.types";

dotenv.config();
export default class OngController {
  static async registerOng(body: OngRegister, res: Response) {
    const {
      cnpj,
      context,
      address,
      name,
      email,
      phone,
      description,
      expiresIn,
      profileImage,
      accessToken,
      publicKey,
      refreshToken,
    } = body;
    const ong = await OngRepository.create({
      name,
      email,
      cnpj,
      context,
      address,
      phone,
      description,
      expiresIn,
      profileImage,
      accessToken,
      publicKey,
      refreshToken,
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
    const ongs = await OngRepository.findAllActive();
    return res.status(200).json(ongs);
  }
  static async getAllOngsForUsers(res: Response) {
    const ongs = await OngRepository.findAllActiveForUsers();
    return res.status(200).json(ongs);
  }
  static async deleteOng(req: Request, res: Response) {
    const { ong_id } = req.params;
    await OngRepository.delete(ong_id);
    return res.status(200).json({
      message: "Ong deletada com sucesso",
    });
  }
  static async editOng(body: OngUpdate, req: Request, res: Response) {
    const { ong_id } = req.params;
    await OngRepository.update(ong_id, body);
    return res.status(200).json({
      message: "Ong editada com sucesso",
    });
  }
}
