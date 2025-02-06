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
      }
      return session;
    },
    async authorized({ auth, request }) {
      const user = auth?.user;

      // login page
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // prevent access login page if logged in already
      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/home", request.nextUrl));
      }
      return true;
    },
  },
};
