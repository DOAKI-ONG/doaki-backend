import { Perfil } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { UserUpdate } from "src/types/user.types";
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
      select: {
        password: true,
        id_user: true,
        status: true,
      },
      where: {
        email,
      },
    });
  }
  static async findById(id: string) {
    return await prisma.user.findFirst({
      select: {
        id_user: true,
        name: true,
        email: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id_user: id,
      },
    });
  }
  static async findAll() {
    return await prisma.user.findMany({
      select: {
        id_user: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  static async delete(id: string) {
    return await prisma.user.update({
      where: {
        id_user: id,  
      },
      data: {
        status: false,
      },
    });
  }
  static async update(id: string, user: UserUpdate) {
    return await prisma.user.update({
      where: {
        id_user: id,
      },
      data: {
        phone: user.phone,
        email: user.email,
      },
    });
  }
}
