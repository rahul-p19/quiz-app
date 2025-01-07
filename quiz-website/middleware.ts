import NextAuth from "next-auth"
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  // Check if user is authenticated
  const isPublicRoute = [
    '/signup',     // Signup page
    '/',
    '/login',
    '/signup-admin'// Homepage - remove if you want it protected
  ].includes(nextUrl.pathname);
  if (isPublicRoute) {
    return NextResponse.next();
  }
  if (!req.auth) {
    // Redirect to login if trying to access protected routes
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  const role = req.auth?.user?.role;



  // all admin routes to start with /admin
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  // ADMIN ROUTES - redirect non-admin users
  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  // Allow access to other routes
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next|api|auth/.*|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']
};
