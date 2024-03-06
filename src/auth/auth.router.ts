import { Router } from "express";
import { AuthController } from "./auth.controller";
import UserRouter from "../users/user.router";

const authController = new AuthController();
const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.use("/admin", UserRouter);

export default router;
