import mongoose, { Schema, Document, Types, Model } from "mongoose";

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
});

export const User: Model<User> = mongoose.model<User>("User", userSchema);
