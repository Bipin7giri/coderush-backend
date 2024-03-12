import { clouddebugger } from "googleapis/build/src/apis/clouddebugger";
import { ApiSuccessStatus } from "../../constant/message.constant";
import { Logger } from "../../logger/loger";
import { User } from "../../users/user.entity";
import AppService from "../app.service";
import FastestFingerModel, {
  type IFastestFinger,
} from "./fastest-finger.schema";

export class FastestFingerService {
  constructor(
    private readonly fastestFingerModel = FastestFingerModel,
    private readonly userModel = User,
    private readonly log = new Logger(),
    private readonly appService = new AppService(),
  ) {}

  async create(fastestFinger: IFastestFinger): Promise<string> {
    const coderOne = await this.userModel.findOne({
      _id: fastestFinger.coderOne,
    });
    const coderTwo = await this.userModel.findOne({
      _id: fastestFinger.coderTwo,
    });
    const data = await this.fastestFingerModel.create({
      roomId: fastestFinger.roomId,
      fileUrl: fastestFinger.fileUrl,
      message: fastestFinger.message,
      coderOne,
      coderTwo,
    });
    console.log(data);
    return ApiSuccessStatus.CREATED;
  }

  async findByUserId(userId: string): Promise<IFastestFinger | null> {
    return await this.fastestFingerModel.findOne({
      user: userId,
    });
  }

  async verifyAnswer(code: string, answer: any) {
    try {
      const output: any = this.appService.executeNodeCodeSync(code);
      console.log(answer);
      console.log(output.output.trim());
      return output.output.trim() === answer ? true : false;
    } catch (err) {
      false;
    }
  }
}
