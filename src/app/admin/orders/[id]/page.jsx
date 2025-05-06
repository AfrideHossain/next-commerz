import { getAnOrderById } from "@/app/actions/orderAdminAction";
import ChangeOrderStatusBtn from "@/components/orders/ChangeOrderStatusBtn";
import React from "react";

const statuses = ["confirmed", "shipped", "cancelled"];
const statusColors = {
  confirmed: "bg-blue-800 text-blue-100",
  shipped: "bg-green-800 text-green-100",
  cancelled: "bg-red-800 text-red-100",
};

export default async function OrderDetailsAdmin({ params }) {
  const { id } = await params;
  let order = {};
  const getOrderRes = await getAnOrderById(id);
  if (getOrderRes.success) {
    order = getOrderRes.order;
  } else {
    throw new Error(getOrderRes.msg);
  }

  const subtotal = order.products.reduce(
    (acc, item) => acc + item?.productId?.price * item?.quantity,
    0
  );
  const total = subtotal + order?.deliveryCharge;

  // change status handler
  const handleStatusChange = (newStatus) => {
    console.log(newStatus);
  };

  return (
    <div className="text-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Order #{order?._id.toString()}
        </h1>

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-6">
          {/* Customer Info */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400">Customer</p>
              <p className="text-lg font-medium text-white">
                {order?.userId?.name}
              </p>
              <p className="text-sm text-gray-400">{order?.userId?.email}</p>
            </div>

            {/* Status Display */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[order?.status]
              }`}
            >
              {order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
            </span>
          </div>

          {/* Status Buttons */}
          <div className="flex flex-wrap gap-2">
            {statuses.map((status, indx) => (
              // <button
              //   key={status}
              //   // onClick={() => handleStatusChange(status)}
              //   className={`px-4 py-1 rounded-full text-sm border transition-colors
              //     ${
              //       order.status === status
              //         ? `${statusColors[status]} border-transparent`
              //         : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
              //     }`}
              // >
              //   {status.charAt(0).toUpperCase() + status.slice(1)}
              // </button>
              <ChangeOrderStatusBtn
                key={indx}
                className={`px-4 py-1 rounded-full text-sm border transition-colors
                  ${
                    order.status === status
                      ? `${statusColors[status]} border-transparent`
                      : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                  }`}
                status={status}
                orderId={order?._id.toString()}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </ChangeOrderStatusBtn>
            ))}
          </div>

          {/* Shipping Info */}
          <div>
            <p className="text-sm text-gray-400">Shipping Address</p>
            <p className="text-sm text-gray-300">
              {order?.shipping?.name}, {order?.shipping.address?.city},{" "}
              {order?.shipping?.address?.district},{" "}
              {order?.shipping?.address?.division} -{" "}
              {order?.shipping?.address?.zip}
            </p>
          </div>

          {/* Products */}
          <div className="divide-y divide-gray-800">
            {order?.products.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-4">
                <div>
                  <p className="font-medium text-white">
                    {item?.productId?.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    Qty: {item?.quantity} x ${item?.productId?.price}
                  </p>
                </div>
                <p className="font-semibold text-gray-200">
                  ${item?.productId?.price * item?.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="border-t border-gray-800 pt-4 space-y-2 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>${order?.deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-base text-white">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
