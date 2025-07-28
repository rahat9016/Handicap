// src/schemas/page-section.schema.ts
import * as Yup from "yup";
import { InferType } from "yup";

const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const pageSectionSchema = Yup.object().shape({
  pageId: Yup.string().required("Page ID is required"),
  sectionType: Yup.string().required("Section type is required"),
  order: Yup.number()
    .required("Order is required")
    .positive("Order must be positive")
    .integer("Order must be an integer"),
  title: Yup.string().optional(),
  subtitle: Yup.string().optional(),
  content: Yup.string().optional(),
  buttonLabel: Yup.string().optional(),
  buttonUrl: Yup.string().optional(),
  configuration: Yup.object().optional(),
  isActive: Yup.boolean().default(true),
  images: Yup.mixed<File | string>()
    .nullable()
    .optional()
    .test(
      "fileType",
      "Only JPG/PNG images are accepted (max 2MB)",
      (value) => {
        if (!value || typeof value === "string") return true;
        return SUPPORTED_FORMATS.includes(value.type);
      }
    )
    .test("fileSize", "File too large (max 2MB)", (value) => {
      if (!value || typeof value === "string") return true;
      return value.size <= FILE_SIZE;
    })
});

export type PageSectionForm = InferType<typeof pageSectionSchema>;