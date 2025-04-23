import { getAnOrderById } from "@/app/actions/orderAdminAction";
import React from "react";

export default async function OrderDetailsAdmin({ params }) {
  const { id } = await params;
  let order = {};
  const getOrderRes = await getAnOrderById(id);
  if (getOrderRes.success) {
    order = getOrderRes.order;
  } else {
    throw new Error(getOrderRes.msg);
  }
  return <div>OrderDetailsAdmin id {id}</div>;
}
