// schemas/contactSchema.ts
import * as yup from 'yup';

export const contactValidationSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().optional(),
    organization: yup.string().optional(),
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),

    subject: yup.string().required('Subject is required').min(5, 'Message must be at least 5 characters'),
    message: yup
        .string()
        .required('Message is required')
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message cannot exceed 1000 characters'),
});

export type ContactFormType = yup.InferType<typeof contactValidationSchema>;