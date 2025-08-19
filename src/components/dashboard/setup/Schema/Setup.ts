import * as yup from "yup";
import { InferType } from "yup";
export const organizerTypeSetup = yup.object().shape({
  name: yup.string()
      .required("Organizer name is required")
      .min(1, "Organizer name is required"),
});


export const languageSchema = yup.object({
  code: yup
    .string()
    .required("Code is required")
    .min(2, "Code must be at least 2 characters")
    .max(10, "Code must be at most 5 characters"),
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Name must be at most 50 characters"),
  nativeName: yup
    .string()
    .required("Native name is required")
    .max(50, "Native name must be at most 50 characters"),
});

export type OrganizerTypeSetupForm = InferType<typeof organizerTypeSetup>;
export type LanguageForm = InferType<typeof languageSchema>;