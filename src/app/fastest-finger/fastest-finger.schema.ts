import mongoose, { Schema, type Document, type Types } from "mongoose";

// Define interface for Message document
export interface IFastestFinger extends Document {
  roomId: string;
  fileUrl?: string;
  message?: string;
  question?: Types.ObjectId;
  coderOne?: Types.ObjectId;
  coderTwo?: Types.ObjectId;
}

const fastestFingerSchema: Schema<IFastestFinger> = new Schema<IFastestFinger>({
  roomId: { type: String, required: true },
  fileUrl: { type: String },
  message: { type: String },
  coderOne: { type: Schema.Types.ObjectId, ref: "User" },
  coderTwo: { type: Schema.Types.ObjectId, ref: "User" },
});

const FastestFingerModel = mongoose.model<IFastestFinger>(
  "FastestFinger",
  fastestFingerSchema
);

export default FastestFingerModel;
