import express from "express";
import UserPublicRoutes from "./public/UserPublicRoutes";
const router = express.Router();

router.use("/", UserPublicRoutes);


export default router;
