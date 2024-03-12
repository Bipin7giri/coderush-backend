import { v2 as cloudinary } from "cloudinary";
import { type Request, type Response } from "express";
import { ApiResponseHandler } from "../utils/apiResponse.utils";
import dotenv from "dotenv";
import {
  downloadFile,
  uploadFileToGoogleDrive,
} from "../google-drive/googledrive";
import { ResumeService } from "../users/resume/resume.service";
dotenv.config();
console.log(process.env.CLOUDINARY_CLOUD_NAME);
const resumeService = new ResumeService();
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

          (result) => {},
        )
        .then((result) => {
          ApiResponseHandler.handleSuccess(res, result.secure_url);
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async uploadResume(req: any, res: Response): Promise<void> {
    const userId = req.user;
    const googleDrive = await uploadFileToGoogleDrive(
      req?.file?.path as string,
    );
    console.log(userId, googleDrive);
    const data = await resumeService.create(userId, {
      fileId: googleDrive,
      fileName: "resume",
    } as any);
    ApiResponseHandler.handleSuccess(res, data);
  }

  async downloadResume(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params;
      const { buffer, metadata } = await downloadFile(fileId);

      // Set appropriate headers for file download
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${metadata.name}"`,
      );
      res.setHeader("Content-Type", metadata.mimeType);

      // Send the buffer back to the client
      res.send(buffer);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
}
