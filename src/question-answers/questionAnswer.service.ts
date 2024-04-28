import { ApiSuccessStatus } from "../constant/message.constant";
import { Logger } from "../logger/loger";
import { type IQuestion, QuestionAnswerModel } from "./QuestionAnswer.entity";

export class QuestionAnswerService {
  constructor(
    private readonly questionModel = QuestionAnswerModel.Question,
    private readonly log = new Logger()
  ) {}

  async createQuestion(question: IQuestion): Promise<string> {
    try {
      console.log(question);
      await this.questionModel.create({
        ...question,
        answers: JSON.stringify(question.answers),
      });
      return ApiSuccessStatus.CREATED;
    } catch (error: any) {
      console.log(error);

      this.log.logError(error.message as Error);
      return error.message;
    }
  }

  async updateQuestion(question: IQuestion): Promise<string> {
    try {
      const updatedQuestion = await this.questionModel.findByIdAndUpdate(
        question._id,
        question,
        { new: true }
      );
      if (updatedQuestion == null) {
        return ApiSuccessStatus.NOT_FOUND;
      }
      return ApiSuccessStatus.UPDATED;
    } catch (error) {
      console.error("Error updating question:", error);
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async findQuestionsByDifficulty(
    difficulty: string
  ): Promise<IQuestion[] | null> {
    try {
      const questions = await this.questionModel.find({ difficulty }).exec();
      return questions;
    } catch (error) {
      console.error("Error finding questions by difficulty:", error);
      return null;
    }
  }

  async findAllQuestions(
    page: number = 1,
    limit: number = 10,
    searchQuery?: string
  ): Promise<
    | {
        questions: IQuestion[];
        totalItems: number;
        itemsPerPage: number;
        currentPage: number;
        totalPages: number;
      }
    | string
  > {
    try {
      let query = {};
      if (searchQuery != null) {
        query = { $text: { $search: searchQuery } };
      }

      const skip = (page - 1) * limit;
      const questionsPromise = this.questionModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .exec();
      const totalPromise = this.questionModel.countDocuments(query).exec();

      const [questions, total] = await Promise.all([
        questionsPromise,
        totalPromise,
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        questions,
        totalItems: total,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
      };
    } catch (error) {
      console.error("Error finding questions:", error);
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
