"use client";

import { changeOrderStatus } from "@/app/actions/orderAdminAction";
import { cn } from "@/utils/cn";

export default function ChangeOrderStatusBtn({ className, orderId, status, children }) {
  const handleConfirmOrder = async () => {
    console.log("handleConfirmOrder called...");
    const changeStatusRes = await changeOrderStatus(orderId, status);
  };
  return (
    <button
      onClick={handleConfirmOrder}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
