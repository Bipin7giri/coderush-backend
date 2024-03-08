import { Router } from "express";
import { UserController } from "./user.controller";
import { AuthMiddleware } from "../middleware/auth-middleware/auth.middleware";
const authMiddleware = new AuthMiddleware();
const userController = new UserController();
const router = Router();
router.get(
  "/me",
  authMiddleware.AuthenticationMiddleware,
  userController.getMe,
);
router.put(
  "/me",
  authMiddleware.AuthenticationMiddleware,
  userController.updateMe,
);
export default router;
