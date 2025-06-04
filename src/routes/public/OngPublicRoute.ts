import { Request, Response, NextFunction } from "express";
import express from "express";
import OngController from "@controllers/OngController";

const OngPublicRoutes = express.Router();


OngPublicRoutes.get("/user/getAll/", async (req: Request, res: Response) => {
  await OngController.getAllOngsForUsers(res);
});

export default OngPublicRoutes;