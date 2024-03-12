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

// Define interface for answer document
interface IAnswer extends Document {
  question_id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  content: string;
  votes: number;
  created_at: Date;
  updated_at: Date;
}

// Define schema for questions
const questionSchema = new Schema<IQuestion>({
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

// Define schema for answers
const answerSchema = new Schema<IAnswer>({
  question_id: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  votes: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Define models for questions and answers
const Question: Model<IQuestion> = mongoose.model<IQuestion>(
  "Question",
  questionSchema,
);
const Answer: Model<IAnswer> = mongoose.model<IAnswer>("Answer", answerSchema);

export const QuestionAnswerModel = { Question, Answer };
