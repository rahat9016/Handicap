import * as Yup from "yup";
import { InferType } from "yup";

export const trainingSchema = Yup.object({
  title: Yup.string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters"),

  linkUrl: Yup.string()
    .url("Please enter a valid URL"),
  isActive: Yup.boolean().default(true).notRequired(),
});

export type TrainingFormType = InferType<typeof trainingSchema>;
