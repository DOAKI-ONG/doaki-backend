import { Perfil } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { UserNotFoundError } from "@helpers/user-errors/404/userNotFoundError";
import { UserAlreadyExistsError } from "@helpers/user-errors/409/userAlreadyExistsError";
import { User } from "@prisma/client";

export default class UserRepository {
  static async create(user: {
    name: string;
    email: string;
    password: string;
    cpf: string;
    type: Perfil;
  }): Promise<User> {
    const userExist = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (!userExist) {
      return await prisma.user.create({
        data: user,
      });
    }
    throw new UserAlreadyExistsError();
  }
  static async findByEmail(email: string) : Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
  static async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id_user: id,
      },
    });
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
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
}
