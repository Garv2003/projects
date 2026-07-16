import { NextResponse } from "next/server";
import User from "../../../../../model/user";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/db/db";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.json();
    const user = await User.findOne({ email: formData.email });
    if (user) {
      return new Response("User already exists", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    await User.create({
      email: formData.email,
      name: formData.name,
      password: hashedPassword,
    });
    return new Response("Registration successful", { status: 201 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
