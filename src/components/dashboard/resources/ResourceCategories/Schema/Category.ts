import * as Yup from "yup";
import { InferType } from "yup";

export const categorySchema = Yup.object({
  name: Yup.string()
    .required('Category name is required')
    .min(2, 'Category name must be at least 2 characters'),

  category: Yup.string()
    .nullable(), // Optional field

  description: Yup.string()
    .optional()
    .max(500, 'Description must not exceed 500 characters'),
});


export type CategoryForm = InferType<typeof categorySchema>;