import mongoose, { type Document, type Model, Schema } from "mongoose";

// Define interface for CourseCategory document
export interface ICourse extends Document {
  title: string;
  description: string;
  isVerified: boolean;
  isPublished: boolean;
  isActive: boolean;
  isDeleted: boolean;
  coursesCategory: mongoose.Types.ObjectId;
}

const courseSchema: Schema<ICourse> = new Schema<ICourse>({
  title: String,
  description: String,
  isVerified: Boolean,
  isPublished: Boolean,
  isActive: Boolean,
  isDeleted: Boolean,
  coursesCategory: {
    type: Schema.Types.ObjectId,
    ref: "CoursesCategory",
  },
});

export const CourseSchema: Model<ICourse> = mongoose.model<ICourse>(
  "Courses",
  courseSchema
);
