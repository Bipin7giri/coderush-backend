import { Request, Response } from "express";
import AppService from "./app.service";
const appService = new AppService();
export class AppController {
  async post(req: Request, res: Response) {
    const data = appService.executeNodeCodeSync(req.body.source_code);
    res.json(data);
  }
}
