import Link from "next/link";
import { FaEnvelope, FaHome, FaPhone, FaPhoneAlt } from "react-icons/fa";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-neutral">
      <div className="container min-h-80 mx-auto py-10 grid grid-cols-1 md:grid-cols-3 md:divide-x divide-neutral-400 *:px-10 space-y-5 ">
        <div className="space-y-2 flex flex-col justify-center">
          <h1 className="text-xl md:text-3xl font-bold">JADUR HAAT</h1>
          <p className="font-medium text-base md:text-lg">
            Own the Vibe, Rule the Scene
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://facebook.com">
              <FaFacebook className="w-7 h-7" />
            </Link>
            <Link href="https://facebook.com">
              <FaInstagram className="w-7 h-7" />
            </Link>
          </div>
        </div>
        <div className="space-y-2 flex flex-col justify-center">
          <h2 className="text-lg md:text-2xl font-semibold">Quick Links</h2>
          <Link className="text-sm md:text-base" href="/faq">
            FAQ
          </Link>
          <Link className="text-sm md:text-base" href="/about">
            About us
          </Link>
          <Link className="text-sm md:text-base" href="/feedback">
            Feedback/Report
          </Link>
        </div>
        <div className="space-y-2 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-semibold">Contact Us</h2>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <FaHome /> <p>Pangsha, rajbari</p>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <FaPhoneAlt /> <p>+880 17047 60805</p>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <FaEnvelope /> <p>afridehossain@hotmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
