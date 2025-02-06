import { Inter } from "next/font/google";
import "./globals.css";
import { connectToDb } from "@/lib/mongoConnection";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Next CommerZ",
  description: "An e-commerce platform built with Next.js",
};

export default async function RootLayout({ children }) {
  await connectToDb();
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-950 text-white`}
        suppressHydrationWarning
      >
        <header className="bg-black">
          <Navbar />
        </header>
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
