// src/schemas/page-section.schema.ts
import * as Yup from "yup";
import { InferType } from "yup";

const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const imageSchema = Yup
  .mixed<File | string>()
  .required('Image is required')
  .test('fileType', 'Only JPG, JPEG or PNG file types are allowed', (value) => {
    if (typeof value === 'string') return true;
    return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
  })
  .test('fileSize', 'File size must be less than 10MB', (value) => {
    if (typeof value === 'string') return true;
    return value instanceof File && value.size <= FILE_SIZE;
  })
  .test('validUrlOrFile', 'Must provide a valid image file or a non-empty image URL', (value) => {
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    return value instanceof File;
  });


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
  images: Yup.array().nullable().of(imageSchema)
});

export type PageSectionForm = InferType<typeof pageSectionSchema>;