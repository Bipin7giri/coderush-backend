import mongoose, {
  Schema,
  type Document,
  type Types,
  type Model,
} from "mongoose";

export interface WorkExperience extends Document {
  companyName: string;
  startDate: Date;
  endDate: Date;
  position: string;
  description: string;
  user: Types.ObjectId;
}

const workExperienceSchema: Schema<WorkExperience> = new Schema<WorkExperience>(
  {
    companyName: String,
    startDate: Date,
    endDate: Date,
    description: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const WorkExperience: Model<WorkExperience> =
  mongoose.model<WorkExperience>("WorkExperience", workExperienceSchema);
