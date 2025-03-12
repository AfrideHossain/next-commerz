import { auth } from "@/auth";
import React from "react";
import { getUserById } from "../actions/userAction";
import Image from "next/image";
import Link from "next/link";
import { LuPencil, LuPencilLine } from "react-icons/lu";

export default async function MyProfile() {
  const session = await auth();
  const response = await getUserById(session?.user.id);
  return (
    <section className="min-h-[calc(100vh-64px)]">
      {/* Profile wrapper */}
      <div className="rounded-lg mt-6 p-4 bg-gray-800">
        <h1 className="text-xl font-semibold mb-4">My Profile</h1>
        {/* Profile Head */}
        <div className="relative bg-accent p-6 rounded-lg flex gap-10 items-center">
          <div className="relative w-40 h-40 bg-gray-800/30 overflow-hidden rounded-xl">
            <Image
              src={response?.user?.image}
              fill
              className="absolute"
              sizes="160px"
              style={{ objectFit: "cover" }}
              alt={`${response?.user.name}'s profile picture`}
            />
          </div>
          {/* head infos */}
          <div className="space-y-2">
            <p className="text-2xl font-bold text-black">
              {response?.user.name}
            </p>
            <p className="text-lg text-black">
              Email : <span>{response?.user.email}</span>
            </p>
            <p className="text-lg text-black">
              Status :{" "}
              <span className="badge badge-ghost text-emerald-500 text-sm">
                Verified
              </span>
            </p>
          </div>
          <div>
            <Link
              className=" absolute top-6 right-6 uppercase btn btn-neutral"
              href={"/my-profile/edit"}
            >
              <LuPencil />
              Edit profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
