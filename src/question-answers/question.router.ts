/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import { QuestionController } from "./questionController";
import { AuthMiddleware } from "../middleware/auth-middleware/auth.middleware";

const router = Router();
const authMiddleware = new AuthMiddleware();
const questionController = new QuestionController();

router.post(
  "/",
  //   authMiddleware.AuthenticationMiddleware,
  //   authMiddleware.AdminRoleMiddleware,
  questionController.create,
);

router.put(
  "/:id",
  //   authMiddleware.AuthenticationMiddleware,
  //   authMiddleware.AdminRoleMiddleware,
  questionController.update,
);

router.get("/difficulty/:difficulty", questionController.getByDifficulty);
router.get("/", questionController.getAll);
export default router;
