import UserController from "@controllers/UserController";
import express from "express";
import { Request, Response } from "express";
import { checkToken } from "@middlewares/ensureAuthenticate";
import { verifyAdminUserRole } from "@middlewares/verifyAdmin";
const UserPrivateRoutes = express.Router();

UserPrivateRoutes.get("/profile/", checkToken, (req: Request, res: Response) => {
  UserController.getUserById(req, res);
});
UserPrivateRoutes.get("/getAll", verifyAdminUserRole, (req: Request, res: Response) => {
  UserController.getAllUsers(req, res);
});

export default UserPrivateRoutes;
