import express from "express";
import UserPublicRoutes from "./public/UserPublicRoutes";
import UserPrivateRoutes from "./private/UserPrivateRoutes";
import OngPrivateRoutes from "./private/OngPrivateRoute";
import DonationPrivateRoutes from "./private/DonationPrivateRoute";
import OngPublicRoutes from "./public/OngPublicRoute";

const router = express.Router();

router.use("/user", UserPublicRoutes, UserPrivateRoutes);
router.use("/ong", OngPrivateRoutes, OngPublicRoutes);
router.use("/donation", DonationPrivateRoutes);
export default router;
