import { ApiResponseHandler } from "../utils/apiResponse.utils";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {
  async registerUser(req: Request, res: Response): Promise<void> {
    const data = await authService.registerUser(req.body);
    ApiResponseHandler.handleSuccess(res, data);
  }
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    await authService.login({ email: email, password: password, res });
  }
}
