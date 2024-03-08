import { ApiSuccessStatus } from "../constant/message.constant";
import { type IQuestion, QuestionAnswerModel } from "./QuestionAnswer.entity";

export class QuestionAnswerService {
  constructor(private readonly questionModel = QuestionAnswerModel.Question) {}

  async create(question: IQuestion): Promise<string> {
    try {
      await this.questionModel.create(question);
      return ApiSuccessStatus.CREATED;
    } catch (error) {
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
