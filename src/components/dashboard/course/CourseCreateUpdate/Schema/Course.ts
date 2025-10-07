import * as Yup from "yup";

export const SUPPORTED_FORMATS = ["image/jpg", "image/webp", "image/jpeg"];

const FILE_SIZE = 10 * 1024 * 1024;

export const courseInformationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(1, "Title is required")
    .max(150, "Title must be at most 150 characters"),

  description: Yup.string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  objectives: Yup.string()
    .max(500, "Objectives must be at most 500 characters")
    .optional(),

  isPrivate: Yup.boolean().optional(),

  categoryId: Yup.string()
    .required("Category is required")
    .min(1, "Category is required"),
  courseType: Yup.string()
    .required("Course type is required")
    .min(1, "Course type is required"),

  organizationId: Yup.string(),
  thumbNail: Yup.mixed<File | string>()
    .required("File is required")
    .test("fileType", "Unsupported file format. Only JPG allowed.", (value) => {
      if (typeof value === "string") return true; // allow URL
      if (value instanceof File) {
        return SUPPORTED_FORMATS.includes(value.type);
      }
      return false;
    })
    .test("fileSize", "File size must be less than 10MB.", (value) => {
      if (typeof value === "string") return true;
      if (value instanceof File) {
        return value.size <= FILE_SIZE;
      }
      return false;
    })
    .test(
      "validUrlOrFile",
      "Must provide a valid file or a non-empty file URL.",
      (value) => {
        if (typeof value === "string") return value.trim() !== "";
        return value instanceof File;
      }
    ),
});

export type resourcesInformationUpdateForm = Yup.InferType<
  typeof courseInformationSchema
>;
