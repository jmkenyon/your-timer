import { NextRequest, NextResponse } from "next/server";

import { headers } from "next/headers";
import { auth } from "./lib/auth";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|media/|[\\w-]+\\.\\w+).*)"],
};

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const pathname = request.nextUrl.pathname;
  if (pathname?.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
