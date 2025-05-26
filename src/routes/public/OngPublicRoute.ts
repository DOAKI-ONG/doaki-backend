import { Request, Response, NextFunction } from "express";
import express from "express";
import OngController from "@controllers/OngController";

const OngPublicRoutes = express.Router();

//pegar todas as ongs: descrição, nome, telefone, email, cnpj, endereco
OngPublicRoutes.get(
  "/ong/getAll", async (req: Request, res: Response) => {
    await OngController.getAllOngs(req, res);
  }
);


