import * as yup from "yup";

export const LoginSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(255, "Password must be at most 255 characters")
        .required("Password is required"),
});

export const SignSchema = yup.object({
    name: yup.string().min(3).max(255),
    email: yup.string().email().min(3).max(255),
    username: yup.string().min(3).max(255),
    password: yup.string().min(8).max(255),
});