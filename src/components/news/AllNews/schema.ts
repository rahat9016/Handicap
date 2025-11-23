// src/schemas/news-section.schema.ts
import * as Yup from "yup";
import { InferType } from "yup";

const FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];

const imageSchema = Yup.mixed<File | string>()
  .test("fileType", "Only JPG, JPEG, PNG, or SVG are allowed", (value) => {
    if (typeof value === "string") return true;
    return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
  })
  .test("fileSize", "File size must be less than 5MB", (value) => {
    if (typeof value === "string") return true;
    return value instanceof File && value.size <= FILE_SIZE;
  })
  .test(
    "validUrlOrFile",
    "Must provide a valid image file or a non-empty URL",
    (value) => {
      if (typeof value === "string") return value.trim() !== "";
      return value instanceof File;
    }
  );

export const newsSectionSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  summary: Yup.string().required("Summary is required"),
  content: Yup.string().required("Content is required"),
  isPublished: Yup.boolean().default(true),
  categoryIds: Yup.array()
    .of(Yup.number())
    .required("At least one category is required"),
  // tagIds: Yup.array().of(Yup.number()).required("At least one tag is required"),
  images: Yup.array().of(imageSchema).nullable(),
  isActive: Yup.boolean().optional(),
});

export type NewsSectionForm = InferType<typeof newsSectionSchema>;
