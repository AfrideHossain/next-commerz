import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-neutral">
      <div className="container min-h-80 mx-auto py-10 grid grid-cols-1 md:grid-cols-3">
        <div className="space-y-2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold">JADUR HAAT</h1>
          <p className="font-medium text-lg">Own the Vibe, Rule the Scene</p>
          <div className="flex items-center gap-4">
            <Link href="https://facebook.com">
              <FaFacebook className="w-7 h-7" />
            </Link>
            <Link href="https://facebook.com">
              <FaInstagram className="w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
