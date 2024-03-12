import { ApiResponseHandler } from "../../utils/apiResponse.utils";
import { WorkExperienceService } from "./workExperience.service";
import { type Response } from "express";
const workExperienceService = new WorkExperienceService();

export class WorkExperienceController {
  async post(req: any, res: Response): Promise<void> {
    const workExperience = req.body;
    const userId = req.user;
    const data = await workExperienceService.create(userId, workExperience);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async getById(req: any, res: Response): Promise<void> {
    const userId = req.user;
    const data = await workExperienceService.getByUserId(userId);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async remove(req: any, res: Response): Promise<void> {
    const id = req.params.id;
    const data = await workExperienceService.remove(id);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async update(req: any, res: Response): Promise<void> {
    const id = req.params.id;
    const education = req.body;
    const data = await workExperienceService.update(id, education);
    ApiResponseHandler.handleSuccess(res, data);
  }
}
