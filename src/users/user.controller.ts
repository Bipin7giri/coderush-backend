import { UserService } from "./user.service";
import { type Response, type Request } from "express";
const userService = new UserService();
export class UserController {
  async createAdmin(req: Request, res: Response): Promise<any> {
    await userService.createAdmin({
      email: "admin@gmail.com",
      password: "12345",
      res,
    });
  }
}
