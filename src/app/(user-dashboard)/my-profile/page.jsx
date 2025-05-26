import { auth } from "@/auth";
import React from "react";
import { getUserById } from "../../actions/userAction";
import Image from "next/image";
import Link from "next/link";
import { LuPencil } from "react-icons/lu";

export default async function MyProfile() {
  const session = await auth();
  const response = await getUserById(session?.user.id);
  return (
    <>
      {/* Profile wrapper */}
      <div className="md:rounded-lg p-4 bg-gray-800">
        <h1 className="text-xl font-semibold mb-4">My Profile</h1>
        {/* Profile Head */}
        <div className="relative bg-accent p-6 rounded-lg flex flex-col md:flex-row md:gap-10 items-center">
          <div className="relative w-40 h-40 bg-gray-800/30 overflow-hidden rounded-xl md:mb-0 mb-5">
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
              className=" absolute top-2 right-2 md:top-6 md:right-6 uppercase btn btn-neutral"
              href={"/my-profile/edit"}
            >
              <LuPencil />
              Edit profile
            </Link>
          </div>
        </div>
        <div>
          <p className="flex gap-4 items-center text-lg text-gray-400 py-4">
            Basic information{" "}
            <span className="border-b border-gray-400 grow"></span>
          </p>

          <div className="space-y-2">
            <div className="flex gap-4">
              <p>Name : </p> <p>{response?.user?.name}</p>
            </div>
            <div className="flex gap-4">
              <p>Email : </p> <p>{response?.user?.email}</p>
            </div>
            <div className="flex gap-4">
              <p>phone : </p>{" "}
              <p>
                {response?.user?.phone || (
                  <span className="text-error">Not found</span>
                )}
              </p>
            </div>
            <div className="flex gap-4">
              <p>NID : </p>{" "}
              <p>
                {response?.user?.nid || (
                  <span className="text-error">Not found</span>
                )}
              </p>
            </div>
          </div>
          {/* Address information */}
          <p className="flex gap-4 items-center text-lg text-gray-400 py-4">
            Addresses <span className="border-b border-gray-400 grow"></span>
          </p>
          <div className="flex flex-col gap-5 md:flex-row md:gap-10">
            {/* Permanent address  */}
            <div className="space-y-2 grow p-3 rounded-xl shadow-lg bg-neutral">
              <p className="text-gray-400 border-b border-gray-400 ">
                Permanent Address
              </p>
              <div className="flex gap-4">
                <p>City : </p>{" "}
                <p>
                  {response?.user?.address?.permanent?.city || (
                    <span className="text-error">Not found</span>
                  )}
                </p>
              </div>
              <div className="flex gap-4">
                <p>District : </p>{" "}
                <p>
                  {response?.user?.address?.permanent?.district || (
                    <span className="text-error">Not found</span>
                  )}
                </p>
              </div>
              <div className="flex gap-4">
                <p>Division : </p>{" "}
                <p>
                  {response?.user?.address?.permanent?.division || (
                    <span className="text-error">Not found</span>
                  )}
                </p>
              </div>
              <div className="flex gap-4">
                <p>Zip Code : </p>{" "}
                <p>
                  {response?.user?.address?.permanent?.zip || (
                    <span className="text-error">Not found</span>
                  )}
                </p>
              </div>
            </div>
            {/* Shipping address  */}
            <div className="space-y-2 grow p-3 rounded-xl shadow-lg bg-neutral">
              <p className="text-gray-400 border-b border-gray-400 ">
                Shipping Address
              </p>
              <div className="flex gap-4">
                <p>City : </p>{" "}
                <p>
                  {response?.user?.address?.shipping?.city || (
                    <span className="text-error">Not found</span>
                  )}
                </p>
              </div>
              <div className="flex gap-4">
                <p>District : </p>{" "}
                <p>
                  {response?.user?.address?.shipping?.district || (
                    <span className="text-error">Not found</span>
                  )}
                </p>
              </div>
              <div className="flex gap-4">
                <p>Division : </p>{" "}
                <p>
                  {response?.user?.address?.shipping?.division || (
                    <span className="text-error">Not found</span>
                  )}
                </p>
              </div>
              <div className="flex gap-4">
                <p>Zip Code : </p>{" "}
                <p>
                  {response?.user?.address?.shipping?.zip || (
                    <span className="text-error">Not found</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
