// src/auth.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { User } from "./models/user-model";
import { connectToDb } from "./lib/mongoConnection";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig, // bring in pages/session/callbacks (but override providers and callback logic here)
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
        if (!credentials) return null;

        await connectToDb();

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isPassMatched = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPassMatched) throw new Error("Email or password mismatched");

        return user; // Returned user will be passed into jwt() callback
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks, // spread Edge-safe callbacks (jwt, session, authorized)

    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectToDb();

        try {
          let existingUser = await User.findOne({ email: profile?.email });
          if (!existingUser) {
            const newUser = new User({
              name: profile?.name,
              email: profile?.email,
              image: profile?.picture,
              role: "user", // default role
            });
            await newUser.save();
            existingUser = newUser;
          }
          // Attach important fields so jwt callback has them
          user.id = existingUser._id.toString(); // <-- add _id
          user.role = existingUser.role;
        } catch (err) {
          console.error("Error in Google sign-in:", err);
          return false;
        }
      }

      return true;
    },
  },
});
