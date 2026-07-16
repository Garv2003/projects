import { NextResponse } from "next/server";
import { connectDB, disconnectDB } from "@/app/db/db";
import Todo from "../../../../model/todo";
import jwt from "jsonwebtoken";

function getUserID(req) {
  const cookie = req.cookies.get("token");
  const { id } = jwt.verify(cookie.value, process.env.JWT_SECRET);
  return id;
}

export async function GET(req) {
  try {
    await connectDB();
    const id = getUserID(req);
    const todos = await Todo.find({ user: id });
    return NextResponse.json({ todos: todos });
  } catch (err) {
    return NextResponse.error(new Error("Failed to fetch todos"), 400);
  } finally {
    await disconnectDB();
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.json();
    const id = getUserID(req);
    const todo = await Todo.create({
      title: formData.title,
      user: id,
    });
    return NextResponse.json({ todo: todo });
  } catch (err) {
    console.error(err);
    return NextResponse.error(new Error("Failed to create todo"), 400);
  } finally {
    await disconnectDB();
  }
}
