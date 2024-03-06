import { ApiResponseHandler } from "../utils/apiResponse.utils";
import { QuestionsService } from "./question.service";

import { type Request, type Response } from "express";
import { type PaginationResponse } from "../utils/pagination.utils";
import { Questions } from "./question.entity";

const questionService = new QuestionsService();
export class QuestionsController {
  async createQuestions(req: any, res: Response): Promise<any> {
    try {
      const { title, description, difficulty, solution } = req.body;
      const userId = req.user;
      const data = await questionService.create({
        title: title,
        description: description,
        difficulty: difficulty,
        solution: solution,
        user: userId,
      });
      ApiResponseHandler.handleSuccess(res, data);
    } catch (error: any) {
      ApiResponseHandler.handleError(res, 500, error.message);
    }
  }

  async updateQuestion(req: any, res: Response): Promise<any> {
    try {
      const questionId = req.params.id;
      const { title, description, difficulty, solution } = req.body;
      const updatedProduct = await questionService.update(questionId, {
        title: title,
        description: description,
        difficulty: difficulty,
        solution: solution,
      });
      ApiResponseHandler.handleSuccess(res, updatedProduct);
    } catch (error: any) {
      ApiResponseHandler.handleError(res, 500, error.message);
    }
  }

  async getQuestions(req: Request, res: Response): Promise<void> {
    try {
      const product: PaginationResponse<Questions> = await questionService.get(
        req?.query?.page?.toString() ?? "1",
        req?.query?.perPage?.toString() ?? "5"
      );
      ApiResponseHandler.handleSuccess(res, product);
    } catch (error: any) {
      ApiResponseHandler.handleError(res, 500, error.message);
    }
  }
}
