"use client";

import { changeOrderStatus } from "@/app/actions/orderAdminAction";
import { cn } from "@/utils/cn";
import { useState } from "react";
import Loader from "../shared/Loader/Loader";

export default function ChangeOrderStatusBtn({
  className,
  orderId,
  options,
  children,
}) {
  // loading state
  const [loading, setLoading] = useState(false);

  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      // const parsedOrderId = JSON.parse(orderId);
      // console.log("parsed orderId: ", parsedOrderId.orderId);
      console.log("options=> ", { options });
      const changeStatusRes = await changeOrderStatus(orderId, options);
    } catch (error) {
      throw new Error("Unable to change status");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-10  z-999 bg-black w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <button
        disabled={loading}
        onClick={handleConfirmOrder}
        className={cn(className)}
      >
        {children}
      </button>
    </>
  );
}
