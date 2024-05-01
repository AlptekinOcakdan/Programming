import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const {auth} = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    console.log("Route", req.nextUrl.pathname)
    console.log("Is logged in", isLoggedIn)
})

export const config = {
    matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}