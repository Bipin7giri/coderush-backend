import { Router } from "express";
import AuthRouter from "../auth/auth.router";
import AppRouter from '../app/app.router'
import QuestionRouter from "../questions/question.router"
const router: Router = Router();
router.use("/auth", AuthRouter);
router.use("/app",AppRouter)
router.use("/question",QuestionRouter);


export default router;
