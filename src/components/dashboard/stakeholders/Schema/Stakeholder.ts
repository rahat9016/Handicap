import * as yup from "yup";
import { InferType } from "yup";

const FILE_SIZE = 5 * 1024 * 1024;

export const SUPPORTED_FORMATS = ["application/pdf"];

export const stakeholderSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .max(255, "Name must be at most 255 characters"),

  file: yup
    .mixed<File | string>()
    .required("File is required")
    .test("fileType", "Unsupported file format. Only PDF allowed.", (value) => {
      if (typeof value === "string") return true;
      if (value instanceof File) {
        return SUPPORTED_FORMATS.includes(value.type);
      }
      return false;
    })
    .test("fileSize", "File size must be less than 5MB.", (value) => {
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

  description: yup
    .string()
    .max(500, "Description must be at most 500 characters")
    .nullable(),
  isActive: yup.boolean().default(true).notRequired(),
});

export type StakeholderFormType = InferType<typeof stakeholderSchema>;
