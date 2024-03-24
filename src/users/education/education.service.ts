import { ApiSuccessStatus } from "../../constant/message.constant";
import { Logger } from "../../logger/loger";
import { User } from "../user.entity";
import { Education } from "./education.entity";

export class EducationService {
  constructor(
    private readonly educationModel = Education,
    private readonly userModel = User,
    private readonly log = new Logger(),
  ) {}

  async create(userId: string, education: Education): Promise<string> {
    try {
      console.log(userId);
      const user = await this.userModel.findOne({
        _id: userId,
      });
      console.log(user);
      const result = await this.educationModel.create({
        ...education,
        user,
      });
      const data = await this.userModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: { education: result },
        },
      );
      console.log(data);
      return ApiSuccessStatus.CREATED;
    } catch (error) {
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async getByUserId(userId: string): Promise<Education[]> {
    return await this.educationModel.find({
      user: userId,
    });
  }

  async remove(id: string): Promise<string> {
    console.log(id);
    const data = await this.educationModel.findOneAndDelete({ _id: id });
    console.log(data);
    return ApiSuccessStatus.DELETED;
  }

  async update(id: string, education: Education): Promise<string> {
    await this.educationModel.findOneAndUpdate({ id }, education);
    return ApiSuccessStatus.UPDATED;
  }
}
