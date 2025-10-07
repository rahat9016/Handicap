import * as Yup from "yup";
import { InferType } from "yup";

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
});

export const otpSchema = Yup.object({
  otp: Yup.string().required("OTP is required"),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export type ForgotPasswordForm = InferType<typeof forgotPasswordSchema>;
export type OTPForm = InferType<typeof otpSchema>;
export type PasswordForm = InferType<typeof passwordSchema>;
export const forgotPasswordValidationSchemas = [
  forgotPasswordSchema,
  otpSchema,
  passwordSchema,
];
