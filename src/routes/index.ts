import express from "express";
import UserPublicRoutes from "./public/UserPublicRoutes";
import UserPrivateRoutes from "./private/UserPrivateRoutes";
const router = express.Router();

router.use("/users", UserPublicRoutes, UserPrivateRoutes);


export default router;
