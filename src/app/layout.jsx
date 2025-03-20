// import { Noto_Sans } from "next/font/google";
import { Jost } from "next/font/google";
import "./globals.css";
import { connectToDb } from "@/lib/mongoConnection";
import { Flip, ToastContainer } from "react-toastify";
import ProviderRedux from "@/components/redux/ProviderRedux";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { getCart } from "./actions/cartActions";
import Navbar from "@/components/shared/Navbar/Navbar";

const jost = Jost({
  subsets: ["latin"],
});

export const metadata = {
  title: "Next CommerZ",
  description: "An e-commerce platform built with Next.js",
};

export default async function RootLayout({ children }) {
  await connectToDb();
  const session = await auth();
  let initialCart = [];
  const getCartRes = await getCart(session?.user?.email);

  if (getCartRes.success) {
    initialCart = getCartRes.cart;
  }
  // console.log("from main layout.js: ", session);
  return (
    <html lang="en">
      <body className={`${jost.className} text-white`} suppressHydrationWarning>
        <SessionProvider session={session}>
          {/* wrap the whole app with redux provider */}
          <ProviderRedux initialCart={initialCart}>
            <header className="bg-black">
              <Navbar />
            </header>
            <main className="container mx-auto px-4">{children}</main>
          </ProviderRedux>
        </SessionProvider>
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
