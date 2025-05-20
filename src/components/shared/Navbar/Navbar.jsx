import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";
import CartIcon from "./CartIcon";
import Menu from "../Menu";
import LogoutBtn from "@/components/authentication/LogoutBtn";
import SearchBar from "@/components/search/SearchBar";

export default async function Navbar() {
  const session = await auth();
  console.log("session from navbar comp=> ", session);

  return (
    <div className="navbar h-16 bg-base-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <Menu
            className={
              "menu dropdown-content bg-base-200 rounded-box z-50 mt-3 w-56 shadow"
            }
          />
        </div>
        <a className="btn btn-ghost text-xl">JADUR HAAT</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <Menu className={"menu menu-horizontal px-1"} />
      </div>
      <div className="navbar-end gap-4">
        {/* <SearchBar className={"w-96"} /> */}
        {!session?.user ? (
          <Link href={"/login"} className="btn btn-primary">
            Sign in
          </Link>
        ) : (
          <>
            {/* cart */}
            <CartIcon />
            {/* User's dp */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="relative w-10 rounded-full">
                  <Image
                    src={session?.user?.image}
                    alt={session?.user?.name}
                    className="absolute"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="64px"
                    priority
                    quality={100}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-50 mt-3 w-52 p-2 shadow-xl"
              >
                <li>
                  <Link href={"/my-profile"} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  {session?.user.role === "admin" ? (
                    <Link href={"/admin"}>Dashboard</Link>
                  ) : (
                    <Link href={"/"}>Settings</Link>
                  )}
                </li>
                <li>
                  {/* <Form action={logoutUser}>
                    <button type="submit">Logout</button>
                  </Form> */}
                  <LogoutBtn />
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
