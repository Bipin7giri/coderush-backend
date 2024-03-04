import { Router } from "express";
import { AppController } from "./app.controller";

const router = Router()
const appController = new AppController()
router.post('/',appController.post)

export default router;