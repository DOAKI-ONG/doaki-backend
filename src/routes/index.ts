import express from "express";
import UserPublicRoutes from "./public/userPublicRoutes";
const router = express.Router();

router.use("/", UserPublicRoutes);


export default router;
