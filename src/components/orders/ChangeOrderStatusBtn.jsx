"use client";

import { changeOrderStatus } from "@/app/actions/orderAdminAction";
import { cn } from "@/utils/cn";

export default function ChangeOrderStatusBtn({
  className,
  orderId,
  status,
  options,
  children,
}) {
  const handleConfirmOrder = async () => {
    // const parsedOrderId = JSON.parse(orderId);
    // console.log("parsed orderId: ", parsedOrderId.orderId);
    console.log("options=> ", { options });
    const changeStatusRes = await changeOrderStatus(orderId, status, options);
  };
  return (
    <button onClick={handleConfirmOrder} className={cn(className)}>
      {children}
    </button>
  );
}
