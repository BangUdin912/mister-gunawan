import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(
  request: NextRequest
) {
  const {
    response,
    user,
  } = await updateSession(request);

  const {
    pathname,
  } = request.nextUrl;


  const isAuthPage =
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";


  const isAdminPage =
    pathname.startsWith("/admin");


  /**
   * User belum login
   * tetapi mencoba mengakses halaman admin
   */
  if (
    !user &&
    isAdminPage
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }


  /**
   * User sudah login
   * tetapi mencoba membuka halaman auth
   */
  if (
    user &&
    isAuthPage
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin",
        request.url
      )
    );
  }


  return response;
}


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml)$).*)",
  ],
};