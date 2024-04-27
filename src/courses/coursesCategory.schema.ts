import mongoose, { type Document, type Model, Schema } from "mongoose";

// Define interface for CourseCategory document
export interface ICourseCategory extends Document {
  name: string;
  courses: mongoose.Types.ObjectId[];
}

const courseCategorySchema: Schema<ICourseCategory> =
  new Schema<ICourseCategory>({
    name: String,
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
  });

export const CourseCategorySchema: Model<ICourseCategory> =
  mongoose.model<ICourseCategory>("CoursesCategory", courseCategorySchema);
