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

const phoneRegExp = /^\+?[0-9]{6,15}$/;

export const profileSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(1, "First name is required"),
  lastName: Yup.string()
    .required("Last is required")
    .min(1, "Last name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  profilePicture: Yup.mixed<File | string>()
    .required("profile picture is required")
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
});

export type profileForm = Yup.InferType<typeof profileSchema>;
