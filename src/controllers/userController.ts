import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { UserLogin, UserRegister } from "src/types/user.types";
import { checkPassword } from "@services/users/checkPassword";
import { WrongPasswordError } from "@helpers/user-errors/400/wrongPasswordError";
import { encryptPassword } from "@services/users/encryptPassword";
import { User } from "@prisma/client";

dotenv.config();
const UserController = {
  loginUser: async (body: UserLogin, res: Response) => {
    const { email, password } = body;
    const userExists = await UserRepository.findByEmail(email);
    if (!(await checkPassword(password, userExists.password))) {
      throw new WrongPasswordError();
    }
    const token = jsonwebtoken.sign(
      {
        id: userExists?.id_user,
      },
      String(process.env.SECRET),
      {
        expiresIn: "12h",
      }
    );
    return res.status(201).json({
      message: "Usuário logado com sucesso",
      token: token,
      profileImage: userExists.profileImage,
    });
  },

  registerUser: async (body: UserRegister, res: Response) => {
    const { name, email, password, cpf } = body;
    const hashedPassword = await encryptPassword(password);
    await UserRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      type: "DONATOR",
    });
    return res.status(201).json({
      message: "Usuário cadastrado com sucesso",
    });
  },
  getUserById: async (req: Request, res: Response) => {
    const id = res.locals.id;
    const user = await UserRepository.findById(id);
    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        cpf: user.cpf,
      },
    });
  },
  getAllUsers: async (req: Request, res: Response) => {
    const users = await UserRepository.findAll();
    return res.status(200).json(users);
  },
  deleteUser: async (req: Request, res: Response) => {
    const id = res.locals.id;
    await UserRepository.delete(id);
    return res.status(200).json({
      message: "Usuário deletado com sucesso",
    });
  },
  editUser: async (body: Partial<User>, res: Response) => {
    const id = res.locals.id;
    const user = await UserRepository.findById(id);
    await UserRepository.update(id, body);
    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        cpf: user.cpf,
      },
    });
  },
};

export default UserController;
