import { prisma } from "../lib/prisma";
import { OngRegister } from "src/types/ong.types";

export default class OngRepository {
  static async create(ong: OngRegister) {
    const ongExists = await prisma.ong.findFirst({
      where: {
        cnpj: ong.cnpj,
      },
    });
    if (ongExists) {
      throw new Error("Ong já existe com esse cnpj");
    }
    return await prisma.ong.create({
      data: ong,
    });
  }
  static async findById(id: string) {
    return await prisma.ong.findFirst({
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
  }
  static async findAll() {
    return await prisma.ong.findMany({
      select: {
        id_ong: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  static async delete(id: string) {
    return await prisma.ong.update({
      where: {
        id_ong: id,
      },
      data: {
        status: false,
      },
    });
  }
}
