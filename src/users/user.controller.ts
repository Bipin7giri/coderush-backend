import { ApiResponseHandler } from "../utils/apiResponse.utils";
import { UserService } from "./user.service";
import { Request, Response } from "express";

const userService = new UserService();

export class UserController {
  async getMe(req: any, res: Response): Promise<void> {
    const userId = req.user;
    const data = await userService.getMe(userId);
    ApiResponseHandler.handleSuccess(res, data);
  }
  async updateMe(req: any, res: Response): Promise<void> {
    const userId = req.user;
    console.log(userId);
    const data = await userService.updateMe(userId, req.body);
    ApiResponseHandler.handleSuccess(res, data);
  }
}
