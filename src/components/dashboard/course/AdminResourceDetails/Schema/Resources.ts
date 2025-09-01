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

export const resourcesInformationUpdateSchema = Yup.object().shape({
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

  organizationId: Yup.string(),

  keywordIds: Yup.array().of(Yup.number()).optional(),
});

export const resourcesFileUpdateSchema = Yup.object().shape({
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
              "Unsupported file format. Only JPG, PNG, PDF, DOC, DOCX allowed.",
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
        })
      )
      .min(1, "Please add at least one file"),
});


export type resourcesInformationUpdateForm = Yup.InferType<typeof resourcesInformationUpdateSchema>;
export type resourcesFileUpdateForm = Yup.InferType<typeof resourcesFileUpdateSchema>;
