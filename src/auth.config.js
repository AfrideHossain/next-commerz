// src/auth.config.js
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [], // providers are only added in auth.js
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Only attach what's already available on the user object (no DB call here)
        token.id = user.id || user._id?.toString();
        token.name = user.name;
        token.email = user.email;
        token.image = user?.image || "";
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token?.image || "";
        session.user.role = token.role;
      }
      return session;
    },
    async authorized({ auth, request }) {
      const user = auth?.user;
      const pathname = request.nextUrl?.pathname;

      const isOnLoginPage = pathname.startsWith("/login");
      const isOnForgetPassPage = pathname.startsWith("/forget-password");
      const isOnResetPassPage = pathname.startsWith("/reset-password");
      const isOnAdminRoute = pathname.startsWith("/admin");

      // Redirect logged-in users away from the login page
      if (isOnLoginPage && user) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }

      // Redirect logged-in users away from the forget-password page
      if (isOnForgetPassPage && user) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }

      // Redirect logged-in users away from the reset-password page
      if (isOnResetPassPage && user) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }

      // Protect admin routes: Only allow users with "admin" role
      if (isOnAdminRoute) {
        if (!user || user.role !== "admin") {
          return NextResponse.redirect(new URL("/403", request.nextUrl));
        }
      }

      return true;
    },
  },
};
