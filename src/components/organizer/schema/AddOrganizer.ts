import * as Yup from "yup";
import { InferType } from "yup";
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
export const organizationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Organizer name is required")
    .min(1, "Organizer name is required"),

  description: Yup.string()
    .max(500, "Description must be at most 500 characters")
    .optional(),

  type: Yup.string()
    .required("Organizer type is required")
    .min(1, "Organizer type is required"),
  contactPhone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+?[0-9]\d{7,14}$/,
      "Phone number is not valid. Use international format like +8801XXXXXXXXX"
    ),
  contactEmail: Yup.string().email("Invalid email address").optional(),

  address: Yup.string().optional(),

  logo: Yup.mixed<File | string>()
    .nullable()
    .optional()
    .test(
      "fileType",
      "Unsupported file format. Only JPG, PNG allowed.",
      (value) => {
        if (!value || typeof value === "string") return true;
        return SUPPORTED_FORMATS.includes(value.type);
      }
    )
    .test("fileSize", "File size must be less than 10MB.", (value) => {
      if (!value || typeof value === "string") return true;
      return value.size <= FILE_SIZE;
    })
    .test(
      "validUrlOrFile",
      "Must provide a valid image file or a non-empty image URL.",
      (value) => {
        if (!value) return true; // allow empty
        if (typeof value === "string") return value.trim() !== "";
        return value instanceof File;
      }
    ),
});

export const userRoleSchema = Yup.object().shape({
  userId: Yup.string()
    .required("User ID is required")
    .min(1, "User ID is required"),
  organizationId: Yup.string()
    .required("Organization ID is required")
    .min(1, "Organization ID is required"),
  roleId: Yup.string()
    .required("Role ID is required")
    .min(1, "Role ID is required"),
});


export type UserRoleForm = InferType<typeof userRoleSchema>;
export type OrganizationForm = InferType<typeof organizationSchema>;
