import UserController from "@controllers/UserController";
import express from "express";
import { Request, Response } from "express";

const UserPublicRoutes = express.Router();

UserPublicRoutes.post("/login", (req: Request, res: Response) => {
  UserController.loginUser(req, res);
});
UserPublicRoutes.post("/register", (req: Request, res: Response) => {
  UserController.registerUser(req, res);
});

export default UserPublicRoutes;
