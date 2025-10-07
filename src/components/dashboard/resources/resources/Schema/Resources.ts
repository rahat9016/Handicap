import * as Yup from "yup";

export const SUPPORTED_FORMATS = [
  // Images
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",

  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // Videos
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
];

const FILE_SIZE = 50 * 1024 * 1024;

export const resourcesSchema = Yup.object().shape({
  title: Yup.string()
    .required("Resources is required")
    .min(1, "Resources name is required"),
  titleBn: Yup.string().nullable(),
  descriptionBn: Yup.string().nullable(),
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

  organizationId: Yup.string(),

  keywordIds: Yup.array().of(Yup.number()).optional(),

  files: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("File title is required"),
        description: Yup.string().required("File description is required"),
        languageId: Yup.string()
          .required("Language is required")
          .min(1, "Language is required"),
        file: Yup.mixed<File | string>()
          .required("File is required")
          .test(
            "fileType",
            "Unsupported file format. Allowed: JPG, PNG, PDF, DOC, DOCX, MP4, MOV, AVI, WEBM.",
            (value) => {
              if (typeof value === "string") return true; // allow URL
              if (value instanceof File) {
                return SUPPORTED_FORMATS.includes(value.type);
              }
              return false;
            }
          )
          .test("fileSize", "File size must be less than 50MB.", (value) => {
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
      })
    )
    .min(1, "Please add at least one file"),
});

export type OrganizationForm = Yup.InferType<typeof resourcesSchema>;
