import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth-middleware/auth.middleware";
import { EducationController } from "./education.controller";
const authMiddleware = new AuthMiddleware();
const educationController = new EducationController();
const router = Router();
router.post(
  "/",
  authMiddleware.AuthenticationMiddleware,
  educationController.post
);

router.get(
  "/",
  authMiddleware.AuthenticationMiddleware,
  educationController.getById
);

export default router;
