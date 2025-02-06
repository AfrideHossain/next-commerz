import { NextResponse } from "next/server";
import { User } from "./models/user-model";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const getUser = await User.findOne({ email: user.email });
        if (getUser) {
          token.id = getUser._id;
          token.name = getUser.name;
          token.email = getUser.email;
          token.image = getUser?.image || "";
          token.role = getUser.role;
        }
      }
      return token;
    },
    async session(session, token) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.email = token.email;
        session.image = token?.image || "";
        session.role = token.role;
      }
      return session;
    },
    async authorized({ auth, request }) {
      const user = auth?.user;
      const pathname = request.nextUrl?.pathname;

      const isOnLoginPage = pathname.startsWith("/login");
      const isOnAdminRoute = pathname.startsWith("/admin");

      // Redirect logged-in users away from the login page
      if (isOnLoginPage && user) {
        return NextResponse.redirect(new URL("/home", request.nextUrl));
      }

      // Protect admin routes: Only allow users with "admin" role
      if (isOnAdminRoute) {
        if (!user || user.role !== "admin") {
          return NextResponse.redirect(new URL("/403", request.nextUrl)); // Redirect to a forbidden page
        }
      }
      return true;
    },
  },
};
