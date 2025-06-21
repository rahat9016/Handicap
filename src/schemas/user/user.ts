import { z } from "zod";

export const UserSchema = z.object({
    name: z.string().min(3, "Password must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const EditUserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export type EditUserFormData = z.infer<typeof EditUserSchema>;

export type UserFormData = z.infer<typeof UserSchema>;