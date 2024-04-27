import { Router } from "express";
import AuthRouter from "../auth/auth.router";
import AppRouter from "../app/app.router";
import UserRouter from "../users/user.router";
import UploadRouter from "../file-upload/fileUpload.router";
import QuestionRouter from "../question-answers/question.router";
import RoleRouter from "../roles/role.router";
import WorkExperienceRouter from "../users/work-experience/workExperience.router";
import EducationRouter from "../users/education/education.router";
import CoursesRouter from "../courses/courses.router";
const router: Router = Router();
router.use("/auth", AuthRouter);
router.use("/roles", RoleRouter);
router.use("/app", AppRouter);
router.use("/users", UserRouter);
router.use("/work-experience", WorkExperienceRouter);
router.use("/education", EducationRouter);
router.use("/upload", UploadRouter);
router.use("/question", QuestionRouter);

router.use("/", CoursesRouter);

export default router;
