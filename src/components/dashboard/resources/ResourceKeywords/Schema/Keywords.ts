import * as Yup from "yup";
import { InferType } from "yup";

export const keywordsSchema = Yup.object({
  name: Yup.string()
    .required('Keyword name is required')
    .min(2, 'Keyword name must be at least 2 characters'),

});


export type KeywordsForm = InferType<typeof keywordsSchema>;