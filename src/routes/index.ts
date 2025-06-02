import express from "express";
import UserPublicRoutes from "./public/UserPublicRoutes";
import UserPrivateRoutes from "./private/UserPrivateRoutes";
import OngPrivateRoutes from "./private/OngPrivateRoute";
import DonationPrivateRoutes from "./private/DonationPrivateRoute";
const router = express.Router();
//falta colocar se o status do user for false...
router.use("/users", UserPublicRoutes, UserPrivateRoutes);
router.use("/ongs", OngPrivateRoutes);
router.use("/donations", DonationPrivateRoutes);
export default router;
