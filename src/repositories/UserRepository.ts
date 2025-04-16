import { prisma } from "../lib/prisma";
export default class UserRepository {
  static async create(user: { name: string; email: string; password: string }) {
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
}
