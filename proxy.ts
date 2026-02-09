import { NextRequest, NextResponse } from "next/server";

import { headers } from "next/headers";
import { auth } from "./lib/auth";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|media/|[\\w-]+\\.\\w+).*)"],
};

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get("host");
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const pathname = request.nextUrl.pathname;


  if (!hostname || !rootDomain) {
    return NextResponse.next();
  }

  const isTenantDomain = hostname.endsWith(`.${rootDomain}`);
  const companySlug = isTenantDomain
    ? hostname.replace(`.${rootDomain}`, "")
    : null;

 
  if (pathname?.startsWith("/dashboard")) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  

  if (isTenantDomain && companySlug) {
    return NextResponse.rewrite(
      new URL(`/company/${companySlug}${pathname}`, request.url)
    );
  }
  return NextResponse.next();
}
