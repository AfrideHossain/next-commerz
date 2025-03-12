import Link from "next/link";
import Menu from "./Menu";
import { auth } from "@/auth";
import Image from "next/image";
import Form from "next/form";
import { logoutUser } from "@/app/actions/authentication";

export default async function Navbar() {
  const session = await auth();

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
              "menu min-h-screen dropdown-content bg-base-200 rounded-box z-50 mt-3 w-56 shadow"
            }
          />
        </div>
        <a className="btn btn-ghost text-xl">Watch Point</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <Menu className={"menu menu-horizontal px-1"} />
      </div>
      <div className="navbar-end gap-4">
        {!session?.user ? (
          <Link
            href={"/login"}
            className="py-3 px-8 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 duration-500 rounded-sm"
          >
            Sign in
          </Link>
        ) : (
          <>
            {/* cart */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />{" "}
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                  <Form action={logoutUser}>
                    <button type="submit">Logout</button>
                  </Form>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
