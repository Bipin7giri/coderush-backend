import { Router } from "express";
import { RoleController } from "./role.controller";
const roleController = new RoleController();
const router = Router();
router.post("/", roleController.post);
router.get("/", roleController.get);
export default router;
