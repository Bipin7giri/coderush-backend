import { ApiResponseHandler } from "../utils/apiResponse.utils";
import { IQuestion } from "./fastest-finger.entity";
import { FastestFingerQuestionService } from "./fastest-finger.service";
import { type Request, type Response } from "express";
const fastestFingerQuestionService = new FastestFingerQuestionService();
export class FastestFingerQuestionController {
  async create(req: Request, res: Response): Promise<void> {
    const data = await fastestFingerQuestionService.createQuestion(req.body);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async update(req: Request, res: Response): Promise<void> {
    const questionId: string = req.params.id;
    const updatedQuestion: IQuestion = req.body;
    updatedQuestion._id = questionId;
    const status = await fastestFingerQuestionService.updateQuestion(
      updatedQuestion
    );
    ApiResponseHandler.handleSuccess(res, status);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchQuery = req.query.search as string;
    const data = await fastestFingerQuestionService.findAllQuestions(
      page,
      limit,
      searchQuery
    );
    ApiResponseHandler.handleSuccess(res, data);
  }

  async getByDifficulty(req: Request, res: Response): Promise<void> {
    const data = await fastestFingerQuestionService.findQuestionsByDifficulty(
      req.params.difficulty
    );
    ApiResponseHandler.handleSuccess(res, data);
  }
}
