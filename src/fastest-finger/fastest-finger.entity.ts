import mongoose, { Schema, type Document, type Model } from "mongoose";
// Define interface for question document
export interface IQuestion extends Document {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  created_at: Date;
  updated_at: Date;
  answers: string[];
}
// Define schema for questions
const fastestFingerSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  tags: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  answers: [{ type: String }],
});

// Define models for questions
const Question: Model<IQuestion> = mongoose.model<IQuestion>(
  "Question",
  fastestFingerSchema
);

export const FastestFingerQuestionModel = { Question };
