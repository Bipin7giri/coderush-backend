import { ApiSuccessStatus } from "../constant/message.constant";
import {
  type IQuestion,
  FastestFingerQuestionModel,
} from "./fastest-finger.entity";

export class FastestFingerQuestionService {
  constructor(
    private readonly questionModel = FastestFingerQuestionModel.Question
  ) {}

  async createQuestion(question: IQuestion): Promise<string> {
    try {
      await this.questionModel.create(question);
      return ApiSuccessStatus.CREATED;
    } catch (error) {
      console.log(error);
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async updateQuestion(question: IQuestion): Promise<string> {
    try {
      const updatedQuestion = await this.questionModel.findByIdAndUpdate(
        question._id,
        question,
        { new: true }
      );
      if (!updatedQuestion) {
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
      if (searchQuery) {
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
