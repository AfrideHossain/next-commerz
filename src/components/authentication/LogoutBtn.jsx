import { logoutUser } from "@/app/actions/authentication";
import Form from "next/form";
import React from "react";

export default function LogoutBtn() {
  return (
    <Form action={logoutUser}>
      <button
        type="submit"
        className="py-2 px-8 font-semibold text-white bg-blue-600 rounded-sm"
      >
        Logout
      </button>
    </Form>
  );
}
