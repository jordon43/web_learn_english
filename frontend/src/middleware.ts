import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hasToken = req.cookies.has("accessToken");
  const url = req.nextUrl;
  const pathname = url.pathname;
  const isAuthPage = pathname.startsWith("/login");

  console.log("hasToken", hasToken);
  console.log("isAuthPage", isAuthPage);

  if (!isAuthPage && !hasToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isAuthPage && hasToken) {
    console.log("isAuthPage");
    return NextResponse.redirect(new URL("/words", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/words",
    "/repeat-words",
    "/saved-words",
    "/favorite-words",
  ],
};
