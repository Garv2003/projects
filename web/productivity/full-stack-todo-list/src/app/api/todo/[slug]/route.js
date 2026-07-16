import { NextResponse } from "next/server";
import { connectDB, disconnectDB } from "@/app/db/db";
import Todo from "../../../../../model/todo";

export async function DELETE(_, { params }) {
  try {
    await connectDB();
    const slug = params.slug;
    const todo = await Todo.findByIdAndDelete(slug);
    return NextResponse.json({ todo: todo });
  } catch (err) {
    return NextResponse.error(new Error("Todo not found"), 404);
  } finally {
    await disconnectDB();
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();
    const slug = params.slug;
    const formData = await req.json();
    const todo = await Todo.findByIdAndUpdate(
      slug,
      { title: formData.title },
      { new: true }
    );
    return NextResponse.json({ todo: todo });
  } catch (err) {
    return NextResponse.error(new Error("Todo not found"), 404);
  } finally {
    await disconnectDB();
  }
}

export async function PUT(_, { params }) {
  try {
    await connectDB();
    const slug = params.slug;
    const todo = await Todo.findById(slug);
    const updatedTodo = await Todo.findByIdAndUpdate(
      slug,
      { completed: !todo.completed },
      { new: true }
    );
    return NextResponse.json({ todo: updatedTodo });
  } catch (err) {
    return NextResponse.error(new Error("Todo not found"), 404);
  } finally {
    await disconnectDB();
  }
}
