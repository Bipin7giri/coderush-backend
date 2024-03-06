import { Router } from "express";
import { UserController } from "./user.controller";

const userController = new UserController();
const router = Router();
router.post("/create", userController.createAdmin);
export default router;
