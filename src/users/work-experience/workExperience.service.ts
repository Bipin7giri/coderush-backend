import { ApiSuccessStatus } from "../../constant/message.constant";
import { Logger } from "../../logger/loger";
import { User } from "../user.entity";
import { WorkExperience } from "./workExperience.entity";

export class WorkExperienceService {
  constructor(
    private readonly workExperienceModel = WorkExperience,
    private readonly userModel = User,
    private readonly log = new Logger()
  ) {}

  async create(
    userId: string,
    workExperience: WorkExperience
  ): Promise<string> {
    try {
      const user = await this.userModel.findOne({
        _id: userId,
      });
      const result = await this.workExperienceModel.create({
        ...workExperience,
        user,
      });
      const data = await this.userModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: { workExperience: result },
        }
      );
      console.log(data);
      return ApiSuccessStatus.CREATED;
    } catch (error) {
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async getByUserId(userId: string): Promise<WorkExperience[]> {
    return await this.workExperienceModel.find({
      user: userId,
    });
  }

  async remove(id: string): Promise<string> {
    console.log(id);
    const data = await this.workExperienceModel.findOneAndDelete({ _id: id });
    console.log(data);
    return ApiSuccessStatus.DELETED;
  }

  async update(id: string, workExperience: WorkExperience): Promise<string> {
    await this.workExperienceModel.findOneAndUpdate({ id }, workExperience);
    return ApiSuccessStatus.UPDATED;
  }
}
