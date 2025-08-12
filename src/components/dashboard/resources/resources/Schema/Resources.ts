import * as Yup from "yup";

export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const FILE_SIZE = 10 * 1024 * 1024;
export const resourcesSchema = Yup.object().shape({
  title: Yup.string()
    .required("Organizer name is required")
    .min(1, "Organizer name is required"),

  description: Yup.string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  isPrivate: Yup.boolean().optional(),
  languageId: Yup.string()
    .required("Language is required")
    .min(1, "Language is required"),
  categoryId: Yup.string()
    .required("Category is required")
    .min(1, "Category is required"),
  organizationId: Yup.string()
    .required("Organization is required")
    .min(1, "Organization is required"),
  keywordIds: Yup.array().of(Yup.number()).optional(),
  file: Yup.mixed<File | string>()
  .test(
    "requiredFile",
    "File is required.",
    (value) => {
      if (typeof value === "string") return value.trim() !== "";
      return value instanceof File && value.size > 0;
    }
  )
  .test(
    "fileType",
    "Unsupported file format. Only JPG, PNG allowed.",
    (value) => {
      if (!value || typeof value === "string") return true;
      return SUPPORTED_FORMATS.includes(value.type);
    }
  )
  .test(
    "fileSize",
    "File size must be less than 10MB.",
    (value) => {
      if (!value || typeof value === "string") return true;
      return value.size <= FILE_SIZE;
    }
  )
});

export type OrganizationForm = Yup.InferType<typeof resourcesSchema>;
