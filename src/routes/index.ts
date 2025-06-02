import express from "express";
import UserPublicRoutes from "./public/UserPublicRoutes";
import UserPrivateRoutes from "./private/UserPrivateRoutes";
import OngPrivateRoutes from "./private/OngPrivateRoute";
import DonationPrivateRoutes from "./private/DonationPrivateRoute";
import OngPublicRoutes from "./public/OngPublicRoute";

const router = express.Router();
//falta colocar se o status do user for false...
router.use("/users", UserPublicRoutes, UserPrivateRoutes);
router.use("/ongs", OngPrivateRoutes, OngPublicRoutes);
router.use("/donations", DonationPrivateRoutes);
export default router;
