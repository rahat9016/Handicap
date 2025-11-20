import * as Yup from "yup";
import { InferType } from "yup";

const phoneRegExp = /^\+?[0-9]{6,15}$/;
export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(100, "First name cannot exceed 100 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .max(100, "Last name cannot exceed 100 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email cannot exceed 100 characters")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters"),
});

export const otpSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  otp: Yup.string().required("OTP is required"),
});

export type SignupForm = InferType<typeof registerSchema>;
export type OTPForm = InferType<typeof otpSchema>;
export const signupValidationSchemas = [registerSchema, otpSchema];
