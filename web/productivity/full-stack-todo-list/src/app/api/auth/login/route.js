import User from "../../../../../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/db/db";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return new Response("Invalid credentials", { status: 401 });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return new Response(token, {
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${
          60 * 60 * 24 * 7
        }; SameSite=Strict;`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
