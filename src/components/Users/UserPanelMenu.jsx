"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuChevronRight } from "react-icons/lu";

export default function UserPanelMenu() {
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <>
      <ul className="menu rounded-box w-56">
        <li>
          <Link
            className={`flex justify-between ${
              pathname === "/my-profile" ? "text-info" : ""
            }`}
            href={"/my-profile"}
          >
            My Profile{" "}
            <LuChevronRight
              className={`${
                pathname === "/my-profile" ? "text-info" : "text-neutral-500"
              }`}
            />{" "}
          </Link>
        </li>
        <li>
          <Link
            className={`flex justify-between ${
              pathname === "/my-profile/edit" ? "text-info" : ""
            }`}
            href={"/my-profile/edit"}
          >
            Update Profile{" "}
            <LuChevronRight
              className={`${
                pathname === "/my-profile/edit"
                  ? "text-info"
                  : "text-neutral-500"
              }`}
            />{" "}
          </Link>
        </li>
        {/* <li>
          <Link
            className={`flex justify-between ${
              pathname === "/my-profile/update-dp" ? "text-info" : ""
            }`}
            href={"/my-profile/update-dp"}
          >
            Change DP{" "}
            <LuChevronRight
              className={`${
                pathname === "/my-profile/update-dp"
                  ? "text-info"
                  : "text-neutral-500"
              }`}
            />{" "}
          </Link>
        </li> */}
        <li>
          <Link
            className={`flex justify-between ${
              pathname === "/change-password" ? "text-info" : ""
            }`}
            href={"/change-password"}
          >
            Change Password{" "}
            <LuChevronRight
              className={`${
                pathname === "/change-password"
                  ? "text-info"
                  : "text-neutral-500"
              }`}
            />{" "}
          </Link>
        </li>
        <li>
          <Link
            className={`flex justify-between ${
              pathname === "/my-orders" ? "text-info" : ""
            }`}
            href={"/my-orders"}
          >
            My orders{" "}
            <LuChevronRight
              className={`${
                pathname === "/my-orders" ? "text-info" : "text-neutral-500"
              }`}
            />{" "}
          </Link>
        </li>
      </ul>
    </>
  );
}
