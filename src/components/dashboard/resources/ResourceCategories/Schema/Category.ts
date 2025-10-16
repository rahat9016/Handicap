import * as Yup from "yup";
import { InferType } from "yup";

export const categorySchema = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters"),

  description: Yup.string()
    .optional()
    .max(500, "Description must not exceed 500 characters"),
  isActive: Yup.boolean().default(true).notRequired(),
});

export type CategoryFormType = InferType<typeof categorySchema>;
