import { v2 as cloudinary } from "cloudinary";
import { type Request, type Response } from "express";
import { ApiResponseHandler } from "../utils/apiResponse.utils";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

export class UploadFileController {
  async uploadAvatar(req: Request, res: Response): Promise<void> {
    try {
      await cloudinary.uploader
        .upload(
          req?.file?.path != null ? req?.file?.path : "",

          (result) => {}
        )
        .then((result) => {
          ApiResponseHandler.handleSuccess(res, result.secure_url);
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
