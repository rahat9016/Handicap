import * as Yup from 'yup';
import { InferType } from 'yup';

export const organizationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Organizer name is required')
    .min(1, 'Organizer name is required'),

  description: Yup.string()
    .max(500, 'Description must be at most 500 characters').optional(),

  type: Yup.string()
    .required('Organizer type is required')
    .min(1, 'Organizer type is required'),
  contactPhone: Yup.string()
    .required('Phone number is required')
    .matches(
      /^\+?[0-9]\d{7,14}$/,
      'Phone number is not valid. Use international format like +8801XXXXXXXXX'
    ),
  contactEmail: Yup.string()
    .email('Invalid email address')
    .optional(),

  address: Yup.string().optional(),

  logo: Yup.string().optional(),
});

export type OrganizationForm = InferType<typeof organizationSchema>;
