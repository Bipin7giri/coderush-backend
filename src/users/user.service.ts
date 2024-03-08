import { ApiSuccessStatus } from "../constant/message.constant";
import { Role } from "../roles/roles.entity";
import { User } from "./user.entity";

interface RegisterUserIF {
  email: string;
  password: string;
  position: string;
  address: string;
  links: string[];
}

export class UserService {
  constructor(
    private readonly userModel = User,
    private readonly roleModel = Role,
  ) {}
  async getMe(id: string): Promise<User | string> {
    try {
      const user: any = await this.userModel
        .findOne({
          _id: id,
        })
        .select("-password");
      return user;
    } catch (error) {
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }
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
        },
      );
      console.log(user);
      return user;
    } catch (error) {
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
