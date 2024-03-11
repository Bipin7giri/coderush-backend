import { ApiSuccessStatus } from "../../constant/message.constant";
import { Logger } from "../../logger/loger";
import { User } from "../../users/user.entity";
import FastestFingerModel, {
  type IFastestFinger,
} from "./fastest-finger.schema";

export class FastestFingerService {
  constructor(
    private readonly fastestFingerModel = FastestFingerModel,
    private readonly userModel = User,
    private readonly log = new Logger(),
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
}
