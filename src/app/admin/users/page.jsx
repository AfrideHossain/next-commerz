import { getUsers } from "@/app/actions/adminActions";
import TabularUsers from "@/components/Users/TabularUsers";
import React from "react";
import { toast } from "react-toastify";

export default async function UsersAdminPanel() {
  let users = [];
  try {
    users = await getUsers();
    // console.log(users);
  } catch (error) {
    toast.error("Unable to get users");
  }
  return (
    <section className="min-h-screen">
      <TabularUsers users={users} />
    </section>
  );
}
