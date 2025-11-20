import * as Yup from "yup";
import { InferType } from "yup";

export const userLoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email cannot exceed 100 characters")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters")
});

export type LoginForm = InferType<typeof userLoginSchema>;
