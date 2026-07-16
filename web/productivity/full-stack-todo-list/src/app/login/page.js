"use client";
import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "@/utils/fnc";
import { loginSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Logged in successfully");
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="wrapper">
      <div className="sub_wrapper">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
          <div className="register-link">
            Don't have an account? <Link href="/register">Register</Link>
          </div>
          <button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
