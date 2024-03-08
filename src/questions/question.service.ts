import { FindOneOptions, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { User } from "../users/user.entity";
import {
  Pagination,
  PaginationOptions,
  PaginationResponse,
} from "../utils/pagination.utils";
import { Questions } from "./question.entity";
import { Difficulty } from "../enum/difficulty.enum";

export class QuestionsService {
  constructor(
    private readonly questionsRepository = AppDataSource.getRepository(
      Questions,
    ),
  ) {}
  // async create(questionsData: {
  //   title: string;
  //   description: string;
  //   difficulty: Difficulty;
  //   solution: string;
  //   user: User;
  // }): Promise<Questions> {
  //   return await this.questionsRepository.save(questionsData);
  // }

  async update(
    questionId: number,
    questionData: Partial<Questions>,
  ): Promise<Questions | undefined> {
    try {
      const findOptions: FindOneOptions<Questions> = {
        where: { id: questionId },
      };
      const question = await this.questionsRepository.findOne(findOptions);
      if (!question) {
        throw new Error(`Question with id ${question} not found.`);
      }
      Object.assign(question, questionData);
      return await this.questionsRepository.save(question);
    } catch (error) {
      throw new Error(`Failed to update question: ${error}`);
    }
  }

  async get(
    page: string,
    perPage: string,
  ): Promise<PaginationResponse<Questions>> {
    const queryBuilder: SelectQueryBuilder<Questions> =
      this.questionsRepository.createQueryBuilder("questions_entity");
    const paginationOptions: PaginationOptions = {
      page: +page,
      perPage: +perPage,
    };

    const pagination = new Pagination<Questions>(
      this.questionsRepository,
      queryBuilder,
      paginationOptions,
    );
    return await pagination.paginate();
  }
}
