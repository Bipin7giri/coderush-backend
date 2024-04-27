import { ApiResponseHandler } from "../utils/apiResponse.utils";
import { CoursesService } from "./courses.service";
import { type Response, type Request } from "express";
const coursesService = new CoursesService();

export class CoursesController {
  async createCategory(req: Request, res: Response): Promise<void> {
    const data = await coursesService.createCategory(req.body);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async createCourse(req: Request, res: Response): Promise<void> {
    const data = await coursesService.createCourse(req.body);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async getCoursesByCategory(req: Request, res: Response): Promise<void> {
    console.log("i am in courses category");
    const data = await coursesService.getCoursesByCategory(req.params.id);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async getAllCategoryCourses(req: Request, res: Response): Promise<void> {
    console.log("i am here");
    const data = await coursesService.getAllCategoryCourses();
    ApiResponseHandler.handleSuccess(res, data);
  }
}
