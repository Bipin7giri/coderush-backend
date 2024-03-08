import { Router } from "express";
import { UploadFileController } from "./fileUpload.controller";
import { upload } from "../middleware/fileUpload.middleware";

const router = Router();
const uploadFileController = new UploadFileController();
router.post(
  "/avatar",
  upload.single("avatar"),
  uploadFileController.uploadAvatar,
);

export default router;
