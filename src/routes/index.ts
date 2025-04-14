import express from "express";
import UserPublicRoutes from "./public/UserPublicRoutes";
const router = express.Router();

router.use("/users", UserPublicRoutes);

export default router;
