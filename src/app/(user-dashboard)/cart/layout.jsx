import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default async function CartLayout({ children }) {
  const session = await auth();
  return (
    <section className="container mx-auto px-4 min-h-screen">
      {/* <SessionProvider session={session}>{children}</SessionProvider> */}
      {children}
    </section>
  );
}
