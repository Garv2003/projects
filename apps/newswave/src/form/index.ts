import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export const RegisterSchema: ZodType<FormData> = z
    .object({
        email: z.string().email(),
        firstName: z
            .string()
            .min(2, { message: "First name is too short" })
            .max(50, { message: "First name is too long" }),
        lastName: z
            .string()
            .min(2, { message: "Last name is too short" })
            .max(50, { message: "Last name is too long" }),
        password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" }),
        confirmPassword: z.string({ message: "Passwords do not match" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type FormData = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
};

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

export type ValidFieldNames =
    | "email"
    | "password"
    | "confirmPassword"
    | "firstName"
    | "lastName";

export const LoginSchema: ZodType<LoginFormData> = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: "Password is too short" })
        .max(20, { message: "Password is too long" }),
});

export type LoginFormData = {
    email: string;
    password: string;
};


// export type ValidFieldNames = "email" | "password";
