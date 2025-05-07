import express from "express";
import UserPublicRoutes from "./public/UserPublicRoutes";
import UserPrivateRoutes from "./private/UserPrivateRoutes";
import OngPrivateRoutes from "./private/OngPrivateRoute";
const router = express.Router();

router.use("/users", UserPublicRoutes, UserPrivateRoutes);
router.use("/ongs", OngPrivateRoutes);

export default router;
