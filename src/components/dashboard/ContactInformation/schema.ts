import * as Yup from "yup";

export const contactInfoSchema = Yup.object().shape({
  contacts: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      designation: Yup.string().required("Designation is required"),
    })
  ),
  emails: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required("Type is required"),
      email: Yup.string().email().required("Email is required"),
    })
  ),
  phones: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required("Type is required"),
      phone: Yup.string().required("Phone number is required"),
    })
  ),
  addresses: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required("Type is required"),
      address: Yup.string().required("Address is required"),
    })
  ),
  officeHours: Yup.string().required("Office hours required"),
  facebookUrl: Yup.string().url().nullable(),
  twitterUrl: Yup.string().url().nullable(),
  linkedinUrl: Yup.string().url().nullable(),
  websiteUrl: Yup.string().url().nullable(),
  mapEmbedUrl: Yup.string().url().nullable(),
});

export type ContactInformationSchema = Yup.InferType<typeof contactInfoSchema>;
