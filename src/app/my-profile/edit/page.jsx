import EditForm from "@/components/Users/EditForm";
import React from "react";

export default function EditProfile() {
  return (
    <section className="min-h-screen flex flex-col items-center border py-4">
      <div className="">
        <h2 className="text-xl font-semibold">{"Edit My Profile"} </h2>{" "}
        <EditForm />
      </div>
    </section>
  );
}
