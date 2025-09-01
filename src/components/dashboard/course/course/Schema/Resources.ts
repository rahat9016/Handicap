import * as Yup from "yup";

export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
];

const FILE_SIZE = 10 * 1024 * 1024;

export const resourcesSchema = Yup.object().shape({
  title: Yup.string()
    .required("Organizer name is required")
    .min(1, "Organizer name is required"),

  description: Yup.string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  thumbNail: Yup.mixed<File | string>()
    .required("File is required")
    .test(
      "fileType",
      "Unsupported file format. Only JPG, PNG allowed.",
      (value) => {
        if (typeof value === "string") return true; // allow URL
        if (value instanceof File) {
          return SUPPORTED_FORMATS.includes(value.type);
        }
        return false;
      }
    )
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
  objectives: Yup.string()
    .max(500, "Objectives must be at most 500 characters")
    .optional(),
  isPrivate: Yup.boolean().optional(),

  organizationId: Yup.string(),
});

export type OrganizationForm = Yup.InferType<typeof resourcesSchema>;
