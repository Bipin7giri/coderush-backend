import { ApiResponseHandler } from "../utils/apiResponse.utils";
import { IQuestion } from "./QuestionAnswer.entity";
import { QuestionAnswerService } from "./questionAnswer.service";
import { type Request, type Response } from "express";
const questionService = new QuestionAnswerService();
export class QuestionController {
  async create(req: Request, res: Response): Promise<void> {
    const data = await questionService.createQuestion(req.body);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async update(req: Request, res: Response): Promise<void> {
    const questionId: string = req.params.id;
    const updatedQuestion: IQuestion = req.body;
    updatedQuestion._id = questionId;
    const status = await questionService.updateQuestion(updatedQuestion);
    ApiResponseHandler.handleSuccess(res, status);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchQuery = req.query.search as string;
    const data = await questionService.findAllQuestions(
      page,
      limit,
      searchQuery,
    );
    ApiResponseHandler.handleSuccess(res, data);
  }

  async getByDifficulty(req: Request, res: Response): Promise<void> {
    const data = await questionService.findQuestionsByDifficulty(
      req.params.difficulty,
    );
    ApiResponseHandler.handleSuccess(res, data);
  }
}
