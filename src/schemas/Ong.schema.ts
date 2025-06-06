import { OngType } from "@prisma/client";
import { z } from "zod";

export const registerOngSchema = z.object({
  name: z.string().min(1,"Name of the ong is required").min(3, "Ong with lenght 3 is necessary").max(255),
  email: z.string().email("Incorrect format for email").min(1,"Email is required").max(255),
  phone: z.string().min(1,"Phone is required").min(10, "Incorrect lenght for phone").max(15),
  cnpj: z.string().min(1,"CNPJ is required").min(14, "Incorrect lenght for CNPJ").max(14),
  context: z.nativeEnum(OngType),
  description: z.string().min(1,"Description is required").min(10, "Ong with description lenght 10 is necessary").max(1000),
  address: z.string().min(1,"Adress is necessary").min(5, "Adress too small").max(255),
  profileImage: z.string().min(1,"Profile image is required").max(255),
  accessToken: z.string().min(1,"Access token is required").max(255),
  publicKey: z.string().min(1,"Public key is required").max(255),
  refreshToken: z.string().min(1,"Refresh token is required").max(255),
  expiresIn: z.number().min(1,"Expires in is required"),
});
export const editOngSchema = z.object({
  name: z.string().min(1,"Name of the ong is required").min(3, "Ong with lenght 3 is necessary").max(255),
  email: z.string().email("Incorrect format for email").min(1,"Email is required").max(255),
  phone: z.string().min(1,"Phone is required").min(10, "Incorrect lenght for phone").max(15),
  cnpj: z.string().min(1,"CNPJ is required").min(14, "Incorrect lenght for CNPJ").max(14),
  context: z.nativeEnum(OngType),
  description: z.string().min(1,"Description is required").min(10, "Ong with description lenght 10 is necessary").max(1000),
  address: z.string().min(1,"Adress is necessary").min(5, "Adress too small").max(255),
  profileImage: z.string(),
}).partial();