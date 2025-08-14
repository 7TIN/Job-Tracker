// import { NextResponse, type NextRequest } from 'next/server'
// import { updateSession } from '@/utils/supabase/middleware'

// export async function middleware(request: NextRequest) {
//   const { supabaseResponse, user } = await updateSession(request)
//   const pathname = request.nextUrl.pathname

//   const isAuthRoute = ['/login', '/register', '/forgot-password'].some((path) =>
//     pathname.startsWith(path)
//   )

//   // Rule 1: Protect private routes
//   if (!user && !isAuthRoute) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/login'
//     return NextResponse.redirect(url)
//   }

//   // Rule 2: Prevent logged-in users from accessing auth routes
//   if (user && isAuthRoute) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/dashboard'
//     return NextResponse.redirect(url)
//   }

//   return supabaseResponse
// }

// export const config = {
//   matcher: [
//     // '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//     '/((?!_next/static|_next/image|favicon.ico|auth).*)',
//   ],
// }


import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { updateSession } from "@/utils/supabase/middleware";

async function verifyAdminToken(token?: string) {
  if (!token) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_session")?.value;
    const isAdmin = await verifyAdminToken(adminToken);

    if (!isAdmin && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (isAdmin && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  }

  const { supabaseResponse, user } = await updateSession(request);
  const isAuthRoute = ["/login", "/register", "/forgot-password"].some((path) =>
    pathname.startsWith(path)
  );

  if (!user && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};