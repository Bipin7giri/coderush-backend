import { ApiResponseHandler } from "../utils/apiResponse.utils";
import { QuestionAnswerService } from "./questionAnswer.service";
import { type Request, type Response } from "express";
const questionService = new QuestionAnswerService();
export class QuestionController {
  async create(req: Request, res: Response): Promise<void> {
    const data = await questionService.create(req.body);
    ApiResponseHandler.handleSuccess(res, data);
  }
}
