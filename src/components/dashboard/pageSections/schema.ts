import * as Yup from "yup";
import { InferType } from "yup";

const FILE_SIZE = 5 * 1024 * 1024; 
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];

// const imageSchema = Yup.mixed<File | string>()
//   .required("Image is required")
//   .test("fileType", "Only JPG, JPEG or PNG file types are allowed", (value) => {
//     if (typeof value === "string") return true;
//     return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
//   })
//   .test("fileSize", "File size must be less than 5MB", (value) => {
//     if (typeof value === "string") return true;
//     return value instanceof File && value.size <= FILE_SIZE;
//   })
//   .test(
//     "validUrlOrFile",
//     "Must provide a valid image file or a non-empty image URL",
//     (value) => {
//       if (typeof value === "string") {
//         return value.trim() !== "";
//       }
//       return value instanceof File;
//     }
//   );


 const optionalImageSchema = Yup.mixed<File | string>()
  .test("fileType", "Only JPG, JPEG, PNG, or SVG files are allowed", (value) => {
    if (typeof value === "string" || !value) return true;
    return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
  })
  .test("fileSize", "File size must be less than 5MB", (value) => {
    if (typeof value === "string" || !value) return true;
    return value instanceof File && value.size <= FILE_SIZE;
  })
  .test(
    "validUrlOrFile",
    "Must provide a valid image file or a non-empty image URL",
    (value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return !value || value instanceof File;
    }
  ); 

  const requiredImageSchema = optionalImageSchema.required("Image is required");

export const pageSectionSchema = Yup.object().shape({
  pageId: Yup.string().required("Page ID is required"),
  sectionType: Yup.string().required("Section type is required"),
  title: Yup.string().optional().nullable(),
  titleBn: Yup.string().nullable(),
  subtitle: Yup.string().optional(),
  subtitleBn: Yup.string().nullable(),
  content: Yup.string().optional().nullable(),
  contentBn: Yup.string().nullable(),
  buttonLabel: Yup.string().notRequired().nullable(),
  buttonLabelBn: Yup.string().nullable(),
  buttonUrl: Yup.string().notRequired().nullable(),
  buttonLabel2: Yup.string().notRequired().nullable(),
  buttonLabelBn2: Yup.string().nullable(),
  buttonUrl2: Yup.string().notRequired().nullable(),
  isActive: Yup.boolean().default(true),
  images: Yup.array().nullable().of(requiredImageSchema),
   backgroundImage: optionalImageSchema.nullable().notRequired(),
});

export type PageSectionForm = InferType<typeof pageSectionSchema>;
