import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'

export function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('q')
    console.log(query)
    return NextResponse.json({ message: "Hello, world!" });
}