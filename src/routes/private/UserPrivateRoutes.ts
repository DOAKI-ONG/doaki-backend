import UserController from "@controllers/UserController";
import express from "express";
import { Request, Response } from "express";
import { checkToken } from "@middlewares/ensureAuthenticate";
import { verifyAdminUserRole } from "@middlewares/verifyAdmin";
const UserPrivateRoutes = express.Router();

UserPrivateRoutes.get("/profile", checkToken, (req: Request, res: Response) => {
  UserController.getUserById(req, res);
});
UserPrivateRoutes.get("/getAll", checkToken, verifyAdminUserRole, (req: Request, res: Response) => {
  UserController.getAllUsers(req, res);
});
UserPrivateRoutes.patch("/delete", checkToken, (req: Request, res: Response) => {
  UserController.deleteUser(req, res);
});
UserPrivateRoutes.patch("/edit", checkToken, (req: Request, res: Response) => {
  UserController.updateUser(req, res);
});

export default UserPrivateRoutes;
