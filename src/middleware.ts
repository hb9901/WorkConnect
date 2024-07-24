// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/video-call/")) {
    return NextResponse.rewrite(new URL("/video-call/prejoin", request.url));
  }
}
export const config = {
  matcher: "/video-call/:name*",
};
