import * as Yup from "yup";
import { InferType } from "yup";

const phoneRegExp = /^\+?[0-9]{6,15}$/;
export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const otpSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  otp: Yup.string().required("OTP is required"),
});

export type SignupForm = InferType<typeof registerSchema>;
