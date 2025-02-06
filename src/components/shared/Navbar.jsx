import Link from "next/link";
import Menu from "./Menu";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="container mx-auto px-4 h-20 flex justify-between items-center">
      <div>
        <Link
          href={"/"}
          className="px-6 py-4 rounded-lg hover:bg-gray-800/80 duration-200 text-2xl font-bold text-gray-50"
        >
          Watch point
        </Link>
      </div>
      <div>
        <Menu />
      </div>
      <div>
        {!session?.user ? (
          <Link
            href={"/login"}
            className="py-3 px-8 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 duration-500 rounded-sm"
          >
            Sign in
          </Link>
        ) : (
          <div className="relative overflow-hidden rounded-full w-11 h-11">
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              className="absolute"
              fill
              objectFit="cover"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
