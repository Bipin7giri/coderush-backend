import mongoose, {
  Schema,
  type Document,
  type Types,
  type Model,
} from "mongoose";

export interface User extends Document {
  fullName: string;
  username: string;
  email: string;
  address: string;
  phoneNumber: string;
  location: string;
  position: string;
  avatar: string;
  isBlocked: boolean;
  password: string;
  roles: Types.ObjectId[];
  questions: Types.ObjectId[];
  workExperience: Types.ObjectId[];
  education: Types.ObjectId[];
  resume: Types.ObjectId;
}

const userSchema: Schema<User> = new Schema<User>({
  fullName: String,
  username: String,
  email: String,
  address: String,
  phoneNumber: String,
  location: String,
  position: String,
  avatar: String,
  isBlocked: Boolean,
  password: String,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  workExperience: [
    {
      type: Schema.Types.ObjectId,
      ref: "WorkExperience",
    },
  ],
  education: [
    {
      type: Schema.Types.ObjectId,
      ref: "Education",
    },
  ],
  resume: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resume",
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const User: Model<User> = mongoose.model<User>("User", userSchema);
