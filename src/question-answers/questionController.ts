import { ApiResponseHandler } from "../utils/apiResponse.utils";
import { QuestionAnswerService } from "./questionAnswer.service";
import { type Request, type Response } from "express";
const questionService = new QuestionAnswerService();
export class QuestionController {
  async create(req: Request, res: Response): Promise<void> {
    const data = await questionService.createQuestion(req.body);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const data = await questionService.findAllQuestions();
    ApiResponseHandler.handleSuccess(res, data);
  }

  async getByDifficulty(req: Request, res: Response): Promise<void> {
    const data = await questionService.findQuestionsByDifficulty(
      req.params.difficulty,
    );
    ApiResponseHandler.handleSuccess(res, data);
  }
}
