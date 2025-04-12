import { prisma } from "../lib/prisma";
export default class UserRepository {
  static create(user: { name: string; email: string; password: string }) {
    const userExist = prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (userExist) {
      throw new Error("Usuário já existe");
    }
    return prisma.user.create({
      data: user,
    });
  }
}
