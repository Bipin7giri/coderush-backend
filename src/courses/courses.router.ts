import { Router } from "express";
import { CoursesController } from "./courses.controller";

const courseController = new CoursesController();
const router = Router();
router.post("/courses/category", courseController.createCategory);
router.post("/courses", courseController.createCourse);
router.get("/course/:id", courseController.getCoursesByCategory);
router.get("/courses/category", courseController.getAllCategoryCourses);

export default router;
