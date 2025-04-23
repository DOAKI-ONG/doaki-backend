import { Perfil } from "@prisma/client";
import { prisma } from "../lib/prisma";
export default class UserRepository {
  static async create(user: { name: string; email: string; password: string ; type: Perfil}) {
    const userExist = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (userExist) {
      throw new Error("Email já cadastrado");
    }
    return await prisma.user.create({
      data: user,
    });
  }
  static async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
  static async findById(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  }
  static async findAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
