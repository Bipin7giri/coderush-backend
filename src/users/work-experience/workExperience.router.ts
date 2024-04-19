import { Router } from "express";
import { WorkExperienceController } from "./workExperience.controller";
import { AuthMiddleware } from "../../middleware/auth-middleware/auth.middleware";
const authMiddleware = new AuthMiddleware();
const workExperienceController = new WorkExperienceController();
const router = Router();
router.post(
  "/",
  authMiddleware.AuthenticationMiddleware,
  workExperienceController.post,
);

router.get(
  "/",
  authMiddleware.AuthenticationMiddleware,
  workExperienceController.getById,
);

router.put(
  "/:id",
  authMiddleware.AuthenticationMiddleware,
  workExperienceController.update,
);

router.delete(
  "/:id",
  // authMiddleware.AuthenticationMiddleware,
  workExperienceController.remove,
);

export default router;
