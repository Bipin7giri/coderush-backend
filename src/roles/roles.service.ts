import { ApiSuccessStatus } from "../constant/message.constant";
import { Logger } from "../logger/loger";
import { Role } from "./roles.entity";

export class RoleService {
  constructor(
    private readonly roleModel = Role,
    private readonly log = new Logger()
  ) {}

  async create(role: Role): Promise<ApiSuccessStatus> {
    try {
      await this.roleModel.create({
        name: role.name,
      });
      return ApiSuccessStatus.CREATED;
    } catch (error) {
      this.log.logError(error as Error);
      return ApiSuccessStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.roleModel.find({});
    return roles;
  }
}
