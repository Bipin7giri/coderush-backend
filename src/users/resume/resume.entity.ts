import mongoose, {
  Schema,
  type Document,
  type Types,
  type Model,
} from "mongoose";

export interface Resume extends Document {
  fileId: string;
  fileName: string;
  user: Types.ObjectId;
}

const resumeSchema: Schema<Resume> = new Schema<Resume>({
  fileId: String,
  fileName: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Resume: Model<Resume> = mongoose.model<Resume>(
  "Resume",
  resumeSchema,
);
