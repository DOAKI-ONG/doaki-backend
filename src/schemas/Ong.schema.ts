import { OngType } from "@prisma/client";
import { z } from "zod";

export const registerOngSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email().min(5).max(255),
  phone: z.string().min(10).max(15),
  cnpj: z.string().min(14).max(14),
  context: z.nativeEnum(OngType),
  address: z.string().min(5).max(255),
});
