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

  // Videos
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
];

const FILE_SIZE = 50 * 1024 * 1024;

export const resourcesInformationUpdateSchema = Yup.object().shape({
  title: Yup.string()
    .required("Organizer name is required")
    .min(1, "Organizer name is required"),
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
});

export type resourcesInformationUpdateForm = Yup.InferType<
  typeof resourcesInformationUpdateSchema
>;

const baseFileSchema = {
  title: Yup.string().required("File title is required"),
  description: Yup.string().required("File description is required"),
  languageId: Yup.string().required("Language is required"),
};

export const resourcesFileUpdateSchema = Yup.object({
  existingFiles: Yup.array()
    .defined()  
    .of(
      Yup.object({
        ...baseFileSchema,
        id: Yup.number().required(),
        file: Yup.mixed<File | string >().nullable().test(
          "existing-file",
          "File is required",
          (value) => {
            if (value === null || value === undefined) return false;
            if (typeof value === "string") return true;
            return value instanceof File;
          }
        ),
      })
    ),

  newFiles: Yup.array()
    .defined()
    .of(
      Yup.object({
        ...baseFileSchema,
        file: Yup.mixed<File | string>()
          .required("File is required")
          .test(
            "fileType",
            "Unsupported file format. Allowed: JPG, PNG, PDF, DOC, DOCX, MP4, MOV, AVI, WEBM.",
            (value) => {
              if (typeof value === "string") return true;
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
    ),
});

export type resourcesFileUpdateForm = Yup.InferType<
  typeof resourcesFileUpdateSchema
>;
