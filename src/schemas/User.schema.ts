import { checkCpf } from "@services/users/checkCpf";
import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    cpf: z.string().min(1, "CPF is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Incorrect format for email"),
    confirm_email: z
      .string()
      .min(1, "Confirm email is required")
      .email("Incorrect format for confirm email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password with lenght 8 is required"),
    confirm_password: z
      .string()
      .min(1, "Confirm password is required")
      .min(8, "Confirm password with lenght 8 is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Mismatched password",
    path: ["confirm_password"],
  })
  .refine((data) => data.email === data.confirm_email, {
    message: "Mismatched email",
    path: ["confirm_email"],
  })
  .refine((data) => checkCpf(data.cpf) == true, {
    message: "Invalid CPF",
    path: ["cpf"],
  });
export const loginUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Incorrect format for email"),
  password: z.string().min(8, "Password with lenght 8 is required"),
});

export const editUserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Incorrect format for email"),
    phone: z
      .string()
      .min(1, "Phone is required")
      .min(10, "Incorrect lenght for phone")
      .max(15),
    cpf: z
      .string()
      .min(1, "CPF is required")
      .min(11, "Incorrect lenght for CPF")
      .max(11),
  })
  .partial()
  .refine(
    (data) =>
      ((data.cpf !== undefined && data?.cpf !== "") && checkCpf(data.cpf) == true),
    {
      message: "Invalid CPF",
      path: ["cpf"],
    }
  );
