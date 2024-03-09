import { ApiResponseHandler } from "../../utils/apiResponse.utils";
import { type Response } from "express";
import { EducationService } from "./education.service";
const educationService = new EducationService();

export class EducationController {
  async post(req: any, res: Response): Promise<void> {
    const workExperience = req.body;
    const userId = req.user;
    const data = await educationService.create(userId, workExperience);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async getById(req: any, res: Response): Promise<void> {
    const userId = req.user;
    const data = await educationService.getByUserId(userId);
    ApiResponseHandler.handleSuccess(res, data);
  }
}
