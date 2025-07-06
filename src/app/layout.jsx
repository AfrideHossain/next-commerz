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
import Footer from "@/components/shared/Footer/Footer";
import Analytics from "@/components/shared/Analytics/Analytics";

const jost = Jost({
  subsets: ["latin"],
});

export const metadata = {
  title: "Jadur Haat - Snag epic fashion that screams YOU",
  description:
    "Explore Jadur Haat’s curated fashion for ages 14-40. Snag bold, luxurious styles that scream YOU. Own the Vibe, Rule the Scene with trendy designs.",
  keywords:
    "Jadur Haat, fashion e-commerce Bangladesh, trendy clothing, luxury fashion, streetwear Bangladesh, formal attire, youth fashion, modern fashion, women’s clothing, men’s fashion, designer outfits, ethnic wear Bangladesh, chic streetwear, fashion accessories, trendy outfits Dhaka, online fashion store, curated fashion, fashion for teens, premium apparel, jadur haat",
};

export default async function RootLayout({ children }) {
  // await connectToDb();
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
            <header className="w-full">
              <Navbar />
            </header>
            <main>{children}</main>
            <Footer />
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
        {/* google analytics */}
        <Analytics />
      </body>
    </html>
  );
}
