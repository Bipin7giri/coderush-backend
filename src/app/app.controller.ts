import { Request, Response } from "express";
import AppService from "./app.service";
const appService = new AppService();
export class AppController {
  async post(req: Request, res: Response) {
    console.log(req.body);
    const data = appService.executeNodeCodeSync(req.body.source_code);
    res.json(data);
  }
}
