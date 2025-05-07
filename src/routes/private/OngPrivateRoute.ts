import express from "express";
import { Request, Response } from "express";
import { checkToken } from "@middlewares/ensureAuthenticate";
import { verifyAdminUserRole } from "@middlewares/verifyAdmin";
import UserController from "@controllers/OngController";

const OngPrivateRoutes = express.Router();

OngPrivateRoutes.post("/register", checkToken, verifyAdminUserRole, (req: Request, res: Response) => {
  UserController.registerOng(req, res);
});
OngPrivateRoutes.get("/profile", checkToken, verifyAdminUserRole, (req: Request, res: Response) => {
    UserController.getOngById(req, res);
});
OngPrivateRoutes.get("/getAll", checkToken, verifyAdminUserRole, (req: Request, res: Response) => {
    UserController.getAllOngs(req, res);
});
OngPrivateRoutes.patch("/delete", checkToken, verifyAdminUserRole, (req: Request, res: Response) => {
    UserController.deleteOng(req, res);
});

export default OngPrivateRoutes;
