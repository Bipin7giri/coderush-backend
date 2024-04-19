/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as path from "path";
import { google } from "googleapis";
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const SCOPES: string[] = ["https://www.googleapis.com/auth/drive.file"];

async function getFileMetadata(
  fileId: string
): Promise<{ name: string; mimeType: string }> {
  const authClient = await authorize();
  const drive = google.drive({ version: "v3", auth: authClient });

  const response = await drive.files.get({
    fileId,
    fields: "name, mimeType",
  });

  const { name, mimeType } = response.data;
  return { name, mimeType } as any;
}

async function authorize(): Promise<any> {
  const jwtClient = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null as any,
    process.env.PRIVATE_KEY,
    SCOPES
  );
  await jwtClient.authorize();
  return jwtClient;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
export async function listFiles(): Promise<void> {
  const authClient = await authorize();
  const drive = google.drive({ version: "v3", auth: authClient });
  const res = await drive.files.list({
    pageSize: 10,
    fields: "nextPageToken, files(id, name)",
  });
  const files = res.data.files;
  if (files?.length === 0) {
    console.log("No files found.");
    return;
  }

  // eslint-disable-next-line array-callback-return
  files?.map((file) => {
    console.log(`${file.name} (${file.id})`);
  });
}

export async function uploadFileToGoogleDrive(filePath: string): Promise<any> {
  const authClient = await authorize();

  const drive = google.drive({ version: "v3", auth: authClient });
  if (fs.existsSync(filePath)) {
    try {
      const file = await drive.files.create({
        media: {
          body: fs.createReadStream(filePath),
        },
        fields: "id",
        requestBody: {
          name: path.basename(filePath),
        },
      });
      return file.data.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    console.log("File does not exist at specified path");
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function downloadFile(
  fileId: string
): Promise<{ buffer: Buffer; metadata: { name: string; mimeType: string } }> {
  const authClient = await authorize();
  const drive = google.drive({ version: "v3", auth: authClient });

  const { name, mimeType } = await getFileMetadata(fileId);

  return await new Promise((resolve, reject) => {
    drive.files.get(
      { fileId: fileId, alt: "media" },
      { responseType: "stream" },
      (err, { data }: any) => {
        if (err) {
          reject(err);
          return;
        }
        const chunks: any[] = [];
        data.on("data", (chunk: any) => {
          chunks.push(chunk);
        });
        data.on("end", () => {
          const buffer = Buffer.concat(chunks);
          resolve({ buffer, metadata: { name, mimeType } });
        });
        data.on("error", (err: any) => {
          reject(err);
        });
      }
    );
  });
}
