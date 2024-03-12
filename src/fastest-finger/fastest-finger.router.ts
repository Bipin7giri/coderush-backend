/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import { FastestFingerQuestionController } from "./fastest-finger.controller";

import { AuthMiddleware } from "../middleware/auth-middleware/auth.middleware";

const router = Router();
const authMiddleware = new AuthMiddleware();
const fastestFingerController = new FastestFingerQuestionController();

router.post(
  "/",
  //   authMiddleware.AuthenticationMiddleware,
  //   authMiddleware.AdminRoleMiddleware,
  fastestFingerController.create
);

router.put(
  "/:id",
  //   authMiddleware.AuthenticationMiddleware,
  //   authMiddleware.AdminRoleMiddleware,
  fastestFingerController.update
);

router.get("/difficulty/:difficulty", fastestFingerController.getByDifficulty);
router.get("/", fastestFingerController.getAll);
export default router;
