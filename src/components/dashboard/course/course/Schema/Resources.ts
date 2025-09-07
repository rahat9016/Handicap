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

// Max video size (adjust as needed, e.g., 500MB)
const MAX_VIDEO_SIZE = 500 * 1024 * 1024; 

// Supported video MIME types
const SUPPORTED_VIDEO_FORMATS = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime", // MOV
  "video/x-msvideo", // AVI
  "video/x-matroska", // MKV
];

export const videoUploadSchema = Yup.object().shape({
  files: Yup.array()
    .of(
      Yup.object().shape({
        uploadType: Yup.string()
          .oneOf(["file", "url"], "Please choose upload type")
          .required("Upload type is required"),

        title: Yup.string().required("Video title is required"),
        description: Yup.string().required("Video description is required"),

        file: Yup.mixed<File | string>().when("uploadType", {
          is: "file",
          then: (schema) =>
            schema
              .required("Video file is required")
              .test(
                "fileType",
                "Unsupported video format. Only MP4, WEBM, MOV, AVI, MKV allowed.",
                (value) => {
                  if (value instanceof File) {
                    return SUPPORTED_VIDEO_FORMATS.includes(value.type);
                  }
                  return false;
                }
              )
              .test(
                "fileSize",
                `Video size must be less than ${MAX_VIDEO_SIZE / (1024 * 1024)}MB.`,
                (value) => {
                  if (value instanceof File) {
                    return value.size <= MAX_VIDEO_SIZE;
                  }
                  return false;
                }
              ),
          otherwise: (schema) => schema.notRequired(),
        }),

        url: Yup.string().when("uploadType", {
          is: "url",
          then: (schema) =>
            schema
              .required("Video URL is required")
              .url("Must be a valid URL")
              .matches(
                /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                "Must be a valid YouTube link"
              ),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    )
    .min(1, "Please add at least one video"),
});

export type OrganizationForm = Yup.InferType<typeof resourcesSchema>;
export type VideoUploadForm = Yup.InferType<typeof videoUploadSchema>;