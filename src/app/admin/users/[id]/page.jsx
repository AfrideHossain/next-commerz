import { getUserByIdAdminAction } from "@/app/actions/adminActions";
import React from "react";

export default async function UserByIdFromAdmin({ params }) {
  const { id } = await params;
  const user = await getUserByIdAdminAction({ id });
  console.log(user);
  return <div>UserByIdFromAdmin</div>;
}
