import { ApiSuccessStatus } from "../constant/message.constant";
import { Role } from "./roles.entity";
import { ApiResponseHandler } from "../utils/apiResponse.utils";
import { RoleService } from "./roles.service";
import { Request, Response } from "express";
const roleService = new RoleService();
export class RoleController {
  constructor() {}

  async post(req: Request, res: Response): Promise<void> {
    const role = req.body;
    const data = await roleService.create(role);
    ApiResponseHandler.handleSuccess(res, data);
  }
  async get(req: Request, res: Response): Promise<void> {
    const data = await roleService.findAll();
    ApiResponseHandler.handleSuccess(res, data);
  }
}
