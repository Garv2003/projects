"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Link from "next/link";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { loginUser } from "@/lib/actions/auth";
import { UserLoginValidation } from "@/lib/validation";
import "react-phone-number-input/style.css";

export const LoginForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserLoginValidation>>({
        resolver: zodResolver(UserLoginValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UserLoginValidation>) => {
        setIsLoading(true);

        try {
            const user = {
                email: values.email,
                password: "",
            };

            await loginUser(user);
            router.push("/profile");
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">Get started with appointments.</p>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />

                <CustomFormField
                    fieldType={FormFieldType.PASSWORD}
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="********"
                    iconSrc="/assets/icons/lock.svg"
                    iconAlt="lock"
                />

                <div className="flex items-center justify-between">
                    <p className="text-dark-700 text-12-semibold">
                        Don&apos;t have an account?{" "}
                        <Link href="register">
                            <Button className="text-primary">Sign up</Button>
                        </Link>
                    </p>
                </div>

                <SubmitButton isLoading={isLoading}>Login In</SubmitButton>
            </form>
        </Form>
    );
};
