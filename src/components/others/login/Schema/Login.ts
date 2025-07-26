import * as Yup from "yup";
import { InferType } from "yup";


export const userLoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginForm = InferType<typeof userLoginSchema>;
