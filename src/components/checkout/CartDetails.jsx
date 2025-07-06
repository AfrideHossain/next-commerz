"use client";

import { useAppSelector } from "@/lib/redux/hooks/reduxHooks";
import { formatPrice } from "@/utils/utils";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export default function CartDetails({ user }) {
  // get full cart from redux
  const cartInformation = useAppSelector((state) => state.cart.items);
  // console.log(cartInformation);
  let subtotal = cartInformation.reduce((acc, item) => {
    let itemPrice = item.discountPrice ?? item.price;
    return acc + itemPrice * item.quantity;
  }, 0);
  const shippingCharge = 0;
  return (
    <div className="p-4 bg-base-300 rounded-md divide-y divide-base-100">
      {cartInformation.map((item) => {
        const price = item.discountPrice ?? item.price;
        return (
          <div
            key={item.productId}
            className="w-full px-4 py-2 flex justify-between items-center"
          >
            <div className="w-full">
              <div className="w-full flex gap-10 items-center justify-between">
                <h2 className="font-semibold">{item.name}</h2>
                <p>{formatPrice(price)} Taka</p>
              </div>
              <span className="text-sm text-gray-400 ">
                Quantity: {item.quantity}
              </span>
            </div>
          </div>
        );
      })}
      <div className="px-4 py-2 space-y-2">
        <div className="flex justify-between">
          <p className="uppercase font-semibold">Sub total: </p>{" "}
          <p className="">{formatPrice(subtotal)} Taka</p>
        </div>
        {user?.vipPass && (
          <div className="flex justify-between">
            <p className="uppercase font-semibold">VIP Customer Discount: </p>{" "}
            <p className=""> - {formatPrice(5)} %</p>
          </div>
        )}
        <div className="flex justify-between">
          <p className="uppercase font-semibold">Delivery Charge: </p>{" "}
          <p className="">{formatPrice(shippingCharge)} Taka</p>
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="flex justify-between">
          <p className="uppercase font-semibold">Total: </p>{" "}
          {user?.vipPass ? (
            <p className="">
              {formatPrice(subtotal * 0.95 + shippingCharge)} Taka
            </p>
          ) : (
            <p className="">{formatPrice(subtotal + shippingCharge)} Taka</p>
          )}
        </div>
      </div>
    </div>
  );
}
