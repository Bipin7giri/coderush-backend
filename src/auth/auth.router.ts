import { Router } from "express";
import { AuthController } from "./auth.controller";

const authController = new AuthController();
const router = Router();
router.post("/register", authController.registerUser);
router.post("/login", authController.login);
// router.use("/admin", UserRouter);

export default router;
