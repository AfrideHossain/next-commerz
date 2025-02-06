import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { User } from "./models/user-model";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { connectToDb } from "./lib/mongoConnection";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          // get user from db
          const user = await User.findOne({ email: credentials?.email });
          console.log(user);
          if (user) {
            const isPassMatched = await bcrypt.compare(
              credentials?.password,
              user?.password
            );
            if (isPassMatched) {
              return user;
            } else {
              throw new Error("Email or Password mismatched");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      // console.log({ user, account, profile });

      // check if the user is already on the database (for google provider)
      if (account.provider === "google") {
        await connectToDb();
        try {
          const getUser = await User.findOne({ email: profile?.email });
          if (!getUser) {
            const newUser = new User({
              name: profile?.name,
              email: profile?.email,
              image: profile?.picture,
            });
            await newUser.save();
          }
        } catch (err) {
          console.log("\n\nError from signin callback=> ", err, "\n\n");
          return false;
        }
      }
      return true;
    },
  },
});
