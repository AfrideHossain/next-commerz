"use client";

import { useAppSelector } from "@/lib/redux/hooks/reduxHooks";

export default function CartDetails() {
  // get full cart from redux
  const cartInformation = useAppSelector((state) => state.cart.items);
  let subtotal = cartInformation.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="p-4 bg-base-300 rounded-md divide-y divide-base-100">
      {cartInformation.map((item) => (
        <div
          key={item.productId}
          className="w-full px-4 py-2 flex justify-between items-center"
        >
          <div className="w-full">
            <div className="w-full flex gap-10 items-center justify-between">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="">
                ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <span className="text-sm text-gray-400 ">
              Quantity: {item.quantity}
            </span>
          </div>
        </div>
      ))}
      <div className="px-4 py-2 space-y-2">
        <div className="flex justify-between">
          <p className="uppercase font-semibold">Sub total: </p>{" "}
          <p>${subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
        <div className="flex justify-between">
          <p className="uppercase font-semibold">Delivery Charge: </p>{" "}
          <p>${(120).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="flex justify-between">
          <p className="uppercase font-semibold">Total: </p>{" "}
          <p>
            ${(subtotal + 120).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
      </div>
    </div>
  );
}
