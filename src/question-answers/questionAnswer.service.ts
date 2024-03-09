import { ApiSuccessStatus } from "../constant/message.constant";
import { type IQuestion, QuestionAnswerModel } from "./QuestionAnswer.entity";

export class QuestionAnswerService {
  constructor(private readonly questionModel = QuestionAnswerModel.Question) {}

  async createQuestion(question: IQuestion): Promise<string> {
    try {
      await this.questionModel.create(question);
      return ApiSuccessStatus.CREATED;
    } catch (error) {
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async findQuestionsByDifficulty(
    difficulty: string,
  ): Promise<IQuestion[] | null> {
    try {
      const questions = await this.questionModel.find({ difficulty }).exec();
      return questions;
    } catch (error) {
      console.error("Error finding questions by difficulty:", error);
      return null;
    }
  }

  async findAllQuestions(): Promise<IQuestion[] | string> {
    try {
      const questions = await this.questionModel.find().exec();
      return questions;
    } catch (error) {
      console.error("Error finding questions:", error);
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
