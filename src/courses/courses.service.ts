import { ApiSuccessStatus } from "../constant/message.constant";
import { Logger } from "../logger/loger";
import { CourseSchema, type ICourse } from "./courses.schema";
import {
  CourseCategorySchema,
  type ICourseCategory,
} from "./coursesCategory.schema";

export class CoursesService {
  constructor(
    private readonly courseModel = CourseSchema,
    private readonly courseCategoryModel = CourseCategorySchema,
    private readonly log = new Logger()
  ) {}

  async createCategory(courseCategory: ICourseCategory): Promise<string> {
    try {
      await this.courseCategoryModel.create(courseCategory);
      return ApiSuccessStatus.CREATED;
    } catch (error) {
      this.log.logError(error as any);
      throw new Error(error as any);
    }
  }

  async createCourse(course: ICourse): Promise<string> {
    try {
      await this.courseModel.create(course);
      return ApiSuccessStatus.CREATED;
    } catch (error) {
      this.log.logError(error as any);
      throw new Error(error as any);
    }
  }

  async getCoursesByCategory(categoryId: string): Promise<ICourse[]> {
    try {
      const courses = await this.courseModel.find({
        _id: categoryId,
      });
      return courses;
    } catch (error) {
      this.log.logError(error as any);
      throw new Error(error as any);
    }
  }

  async getAllCategoryCourses(): Promise<ICourseCategory[]> {
    try {
      const categories = await this.courseCategoryModel.find();
      return categories;
    } catch (error) {
      this.log.logError(error as any);
      console.log(error);
      throw new Error(error as any);
    }
  }
}
