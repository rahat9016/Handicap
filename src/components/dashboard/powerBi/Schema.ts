import * as yup from 'yup';

export const powerBiSchema = yup.object({
    title: yup.string().required('Title is required'),
    link: yup.string().url('Must be a valid URL').required('Power BI link is required'),
    description: yup.string().optional(),
    isActive: yup.boolean().default(true),
});

export type PowerBiForm = yup.InferType<typeof powerBiSchema>;