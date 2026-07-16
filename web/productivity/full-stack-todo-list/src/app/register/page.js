"use client";
import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerSchema } from "@/utils/schema";
import { register } from "@/utils/fnc";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Registered successfully");
        router.push("/login");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      mutate({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <div className="wrapper">
      <div className="sub_wrapper">
        <h1>Register</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <span>{formik.errors.name}</span>
          ) : null}
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
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
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            required
            placeholder="Confirm your password"
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
          />
          {formik.errors.confirm_password && formik.touched.confirm_password ? (
            <span>{formik.errors.confirm_password}</span>
          ) : null}
          <div className="register-link">
            Already have an account? <Link href="/login">Login</Link>
          </div>
          <button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
