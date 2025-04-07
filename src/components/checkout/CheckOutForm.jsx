"use client";

import { orderCheckout } from "@/app/actions/checkoutAction";
import { clear } from "@/lib/redux/features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/reduxHooks";
import Swal from "sweetalert2";

export default function CheckOutForm({ userInfoString, charges }) {
  // state dispatcher
  const dispatch = useAppDispatch();
  // parsed userInfo
  const userInfo = JSON.parse(userInfoString);
  const cart = useAppSelector((state) => state.cart.items);
  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("userId", userInfo._id);
    formData.append("charges", JSON.stringify(charges));
    formData.append("cart", JSON.stringify(cart));
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const placeOrderReq = await orderCheckout(formData);
    // console.
    if (placeOrderReq.success) {
      Swal.fire({
        title: "Yay!",
        text: "You order has been placed.",
        icon: "success",
      }).then(() => dispatch(clear()));
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Unable to place your order.",
        icon: "error",
      });
    }
  };
  return (
    <>
      <form className="space-y-3" onSubmit={handlePlaceOrder}>
        <div>
          <label className="text-sm text-neutral-400">Full Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Full name"
            defaultValue={userInfo.name || ""}
            name="name"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-400">Phone (+880)</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Phone number"
            defaultValue={userInfo.phone || ""}
            name="phone"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm text-neutral-400">City</label>
            <input
              type="text"
              className="input w-full"
              placeholder="City"
              defaultValue={userInfo.address.shipping.city || ""}
              name="shipping_city"
            />
          </div>
          <div>
            <label className="text-sm text-neutral-400">District</label>
            <input
              type="text"
              className="input w-full"
              placeholder="District"
              defaultValue={userInfo.address.shipping.district || ""}
              name="shipping_district"
            />
          </div>
          <div>
            <label className="text-sm text-neutral-400">Division</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Division"
              defaultValue={userInfo.address.shipping.division || ""}
              name="shipping_division"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm text-neutral-400">Zip Code</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Zip Code"
              defaultValue={userInfo.address.shipping.zip || ""}
              name="shipping_zip"
            />
          </div>
          <div>
            <label className="text-sm text-neutral-400">Country</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Country"
              value="Bangladesh"
              disabled
            />
          </div>
          {/* <div className="flex items-end">
                  <button className="btn btn-secondary w-full"> Save </button>
                </div> */}
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-full">
            Place Order
          </button>
        </div>
      </form>
    </>
  );
}
