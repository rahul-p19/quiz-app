import NextAuth from "next-auth"
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig);

export default auth((req)=>{
    const role = req.auth?.user.role;
    const {nextUrl} = req;

    // all admin routes to start with /admin
    const isAdminRoute = (nextUrl.pathname).startsWith("/admin");

    // ADMIN ROUTES
    if(isAdminRoute && role!=="ADMIN") return NextResponse.redirect(`${nextUrl.origin}/`);

})

export const config = {
    matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']
}