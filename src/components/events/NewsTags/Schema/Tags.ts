import * as Yup from "yup";
import { InferType } from "yup";

export const tagsSchema = Yup.object({
  name: Yup.string()
    .required('Tags name is required')
    .min(2, 'Tags name must be at least 2 characters'),

});


export type TagsForm = InferType<typeof tagsSchema>;