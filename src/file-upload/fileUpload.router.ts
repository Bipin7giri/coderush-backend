import { Router } from "express";
import { UploadFileController } from "./fileUpload.controller";
import { upload } from "../middleware/fileUpload.middleware";
import { AuthMiddleware } from "../middleware/auth-middleware/auth.middleware";

const router = Router();
const authMiddleware = new AuthMiddleware();
const uploadFileController = new UploadFileController();
router.post(
  "/avatar",
  upload.single("avatar"),
  uploadFileController.uploadAvatar,
);
router.post(
  "/resume",
  upload.single("resume"),
  authMiddleware.AuthenticationMiddleware,
  uploadFileController.uploadResume,
);

router.get("/resume/download/:fileId", uploadFileController.downloadResume);
export default router;
