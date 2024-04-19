import mongoose, {
  Schema,
  type Document,
  type Types,
  type Model,
} from "mongoose";

export interface Education extends Document {
  universityName: string;
  startDate: Date;
  endDate: Date;
  degreeName: string;
  user: Types.ObjectId;
}

const educationSchema: Schema<Education> = new Schema<Education>({
  universityName: String,
  startDate: Date,
  endDate: Date,
  degreeName: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Education: Model<Education> = mongoose.model<Education>(
  "Education",
  educationSchema,
);
