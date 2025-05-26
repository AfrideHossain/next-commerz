import { getUserById } from "@/app/actions/userAction";
import { auth } from "@/auth";
import EditForm from "@/components/Users/EditForm";
import React from "react";

export default async function EditProfile() {
  const session = await auth();
  const response = await getUserById(session?.user.id);
  // console.log(response.user);
  return (
    <div className="rounded-lg p-4 bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">{"Edit My Profile"} </h2>{" "}
      <EditForm
        prevInfo={{
          ...response?.user,
          _id: response?.user._id.toString(),
          createdAt: response?.user.createdAt.toString(),
        }}
      />
    </div>
  );
}
