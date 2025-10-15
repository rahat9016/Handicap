import * as Yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];

const imageSchema = Yup.mixed<File | string>()
  .required("Image is required")
  .test("fileType", "Only JPG, JPEG, PNG or SVG files are allowed", (value) => {
    if (typeof value === "string") return true; // allow existing URL
    return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
  })
  .test("fileSize", "File size must be less than 5MB", (value) => {
    if (typeof value === "string") return true; // allow URL
    return value instanceof File && value.size <= FILE_SIZE;
  })
  .test(
    "validUrlOrFile",
    "Must provide a valid image file or a non-empty image URL",
    (value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return value instanceof File;
    }
  );

export const eventSchema = Yup.object().shape({
  title: Yup.string()
    .max(150, "Title must be at most 150 characters")
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
  summary: Yup.string()
    .max(300, "Summary must be at most 300 characters")
    .required("Summary is required"),
  featuredImage: Yup.string()
    .max(255, "Featured image URL must be at most 255 characters")
    .nullable(),
  location: Yup.string().max(255).nullable(),
  address: Yup.string().max(500).nullable(),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date cannot be before start date"),
  isOnline: Yup.boolean(),

  isPublished: Yup.boolean(),
  organizationId: Yup.number().optional(),
  categoryIds: Yup.number().required().required("Categories are required"),
  tagIds: Yup.array().of(Yup.number().required()).required("Tags are required"),
  images: Yup.array()
    .of(imageSchema)
    .min(1, "At least one image is required")
    .required("Images are required"),
});

export type EventForm = Yup.InferType<typeof eventSchema>;
