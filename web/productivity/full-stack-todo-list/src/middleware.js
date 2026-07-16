import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function middleware(request) {
  const cookie = cookies().get("token");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/api/todo", "/api/todo/:path*"],
};
