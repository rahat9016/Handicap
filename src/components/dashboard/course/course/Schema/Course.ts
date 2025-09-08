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
                `Video size must be less than ${
                  MAX_VIDEO_SIZE / (1024 * 1024)
                }MB.`,
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

export const singleVideoSchema = Yup.object().shape({
  uploadType: Yup.string()
    .oneOf(["file", "link"], "Please choose upload type")
    .required("Upload type is required"),

  title: Yup.string().required("Video title is required"),
  description: Yup.string().required("Video description is required"),

  file: Yup.mixed<File>().when("uploadType", {
    is: "file",
    then: (schema) =>
      schema
        .required("Video file is required")
        .test(
          "fileType",
          "Unsupported video format. Only MP4, WEBM, MOV, AVI, MKV allowed.",
          (value) => value instanceof File && SUPPORTED_VIDEO_FORMATS.includes(value.type)
        )
        .test(
          "fileSize",
          `Video size must be less than ${MAX_VIDEO_SIZE / (1024 * 1024)}MB.`,
          (value) => value instanceof File && value.size <= MAX_VIDEO_SIZE
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  link: Yup.string().when("uploadType", {
    is: "link",
    then: (schema) =>
      schema
        .required("Video link is required")
        .url("Must be a valid URL")
        .matches(
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
          "Must be a valid YouTube link"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
});


const optionSchema = Yup.object({
  optionText: Yup.string().required('Option text is required'),
  isCorrect: Yup.boolean(),
  sequenceNumber: Yup.number().required(),
});

const questionSchema = Yup.object({
  questionText: Yup.string().required('Question text is required'),
  questionType: Yup
    .string()
    .oneOf(['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY'])
    .required('Question type is required'),
  points: Yup
    .number()
    .typeError('Points must be a number')
    .min(1, 'Points must be at least 1')
    .required('Points are required'),
  sequenceNumber: Yup.number().required(),
  options: Yup.array().of(optionSchema).when('questionType', {
    is: (val: string) => val === 'MULTIPLE_CHOICE',
    then: (schema) =>
      schema
        .min(2, 'Multiple choice questions must have at least 2 options')
        .test(
          'has-correct-answer',
          'Multiple choice questions must have exactly one correct answer',
          (options) => options && options.filter((opt) => opt.isCorrect).length === 1
        ),
  }),
});

export const quizFormSchema = Yup.object({
  questions: Yup
    .array()
    .of(questionSchema)
    .min(1, 'At least one question is required')
    .required(),
});

export type OrganizationForm = Yup.InferType<typeof resourcesSchema>;
export type VideoUploadForm = Yup.InferType<typeof videoUploadSchema>;
export type SingleVideoForm = Yup.InferType<typeof singleVideoSchema>;