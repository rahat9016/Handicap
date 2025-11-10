import * as yup from "yup";

const fieldSchema = yup.object({
  title: yup.object({
    en: yup.string().required("English title is required"),
    bn: yup.string().required("Bangla title is required"),
  }),
  value: yup.object({
    en: yup.string().required("English value is required"),
    bn: yup.string().required("Bangla value is required"),
  }),
});

export const schema = yup.object().shape({
  field1: fieldSchema.optional(),
  field2: fieldSchema.optional(),
  field3: fieldSchema.optional(),
  field4: fieldSchema.optional(),
  field5: fieldSchema.optional(),
});


export type LandingForm = yup.InferType<typeof schema>;