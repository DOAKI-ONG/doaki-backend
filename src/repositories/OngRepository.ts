import { OngAlreadyExistError } from "@helpers/ong-errors/409/OngAlreadyExist";
import { prisma } from "../lib/prisma";
import { OngRegister, OngUpdate } from "src/types/ong.types";
import { OngNotFoundError } from "@helpers/ong-errors/404/ongNotFound";

export default class OngRepository {
  static async create(ong: OngRegister) {
    const ongExists = await prisma.ong.findFirst({
      where: {
        cnpj: ong.cnpj,
      },
    });
    if (!ongExists) {
      return await prisma.ong.create({
        data: ong,
      });
    }
    throw new OngAlreadyExistError();
  }
  static async findById(id: string) {
    const ong = await prisma.ong.findFirst({
      select: {
        id_ong: true,
        name: true,
        email: true,
        context: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id_ong: id,
      },
    });
    if(!ong) {
      throw new OngNotFoundError();
    }
    return ong;
  }
  static async findAllActive() {
    const ongs =  await prisma.ong.findMany({
      select: {
        id_ong: true,
        context: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        email: true,
        address: true,
        phone: true,
        cnpj: true,
        profileImage: true,
        description: true,
      },
    });
    if (!ongs) {
      throw new OngNotFoundError();
    }
    return ongs
  }
  static async findAllActiveForUsers() {
    const ongs =  await prisma.ong.findMany({
      select: {
        name: true,
        email: true,
        address: true,
        phone: true,
        cnpj: true,
        profileImage: true,
        description: true,
        context: true,
      },
      where: {
        status: true,
      },
    });
    if (!ongs) {
      throw new OngNotFoundError();
    }
    return ongs
  }
  static async delete(id: string) {
    const ong = await prisma.ong.findFirst({
      where: {
        id_ong: id,
      },
    });
    if (!ong) {
      throw new OngNotFoundError();
    }
    return await prisma.ong.update({
      where: {
        id_ong: id,
      },
      data: {
        status: false,
      },
    });
  }
  static async update(id: string, ong: OngUpdate) {
    const ongExists = await prisma.ong.findFirst({
      where: {
        id_ong: id,
      },
    });
    if (!ongExists) {
      throw new OngNotFoundError();
    }
    return await prisma.ong.update({
      where: {
        id_ong: id,
      },
      data: ong,
    });
  }
}
