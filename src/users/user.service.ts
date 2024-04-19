import { ApiSuccessStatus } from "../constant/message.constant";
import { Role } from "../roles/roles.entity";
import { User } from "./user.entity";

export class UserService {
  constructor(
    private readonly userModel = User,
    private readonly roleModel = Role
  ) {}

  async getMe(id: string): Promise<User | string> {
    try {
      const user: any = await this.userModel
        .findOne({
          _id: id,
        })
        .select("-password")
        .populate("workExperience")
        .populate("education")
        .populate("resume");
      return user;
    } catch (error) {
      console.log(error);
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async updateMe(id: string, data: any) {
    try {
      const user: any = await this.userModel.findOneAndUpdate(
        {
          _id: id,
        },
        {
          fullName: data.fullName,
          username: data.username,
          address: data.address,
          phoneNumber: data.phoneNumber,
          location: data.location,
        }
      );
      console.log(user);
      return user;
    } catch (error) {
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
// 852717986334-hv4uatv1nh3n6ppd1tnj7chlcohpas86.apps.googleusercontent.com
