// import { Noto_Sans } from "next/font/google";
import { Jost } from "next/font/google";
import "./globals.css";
import { connectToDb } from "@/lib/mongoConnection";
import Navbar from "@/components/shared/Navbar";
import { Flip, ToastContainer } from "react-toastify";

const jost = Jost({
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
        className={`${jost.className} bg-slate-950 text-white`}
        suppressHydrationWarning
      >
        <header className="bg-black">
          <Navbar />
        </header>
        <main className="container mx-auto px-4">
          {children}
        </main>
        {/* React toast container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
      </body>
    </html>
  );
}
