import { ApiSuccessStatus } from "../../constant/message.constant";
import { Logger } from "../../logger/loger";
import { User } from "../user.entity";
import { Resume } from "./resume.entity";

export class ResumeService {
  constructor(
    private readonly resumeModel = Resume,
    private readonly userModel = User,
    private readonly log = new Logger()
  ) {}

  async create(userId: string, resume: Resume): Promise<string> {
    try {
      const user = await this.userModel.findOne({
        _id: userId,
      });
      console.log(user);
      const result = await this.resumeModel.create({
        fileId: resume.fileId,
        fileName: "resume",
        user,
      });
      await this.userModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: { resume: result },
          isNew: true,
        }
      );
      return ApiSuccessStatus.CREATED;
    } catch (error) {
      this.log.logError(error as Error);
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
