import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface Role extends Document {
  name: "USER" | "ADMIN";
  users: Types.ObjectId[];
}

const roleSchema: Schema<Role> = new Schema<Role>({
  name: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Role: Model<Role> = mongoose.model<Role>("Role", roleSchema);

export { Role };
