import { getUserById } from "@/app/actions/userAction";
import { auth } from "@/auth";
import CartDetails from "@/components/checkout/CartDetails";
import { PiHandCoinsLight } from "react-icons/pi";

export default async function CheckOutPage() {
  const session = await auth();
  let userInfo = undefined;
  const getUserReq = await getUserById(session.user.id);
  if (getUserReq.success) {
    userInfo = getUserReq.user;
  } else {
    throw new Error("User not found");
  }
  return (
    <>
      {
        /* !userInfo ? (
        <section className="min-h-screen flex items-center justify-center">
          <p>User not found</p>
        </section>
      ) : */ <section className="flex *:w-full *:p-4 gap-10">
          <div className="space-y-4">
            <h1 className="text-xl uppercase text-center font-semibold">
              Billing information
            </h1>
            <div>
              <label className="label font-semibold tracking-widest uppercase">
                Email
              </label>
              <p>{userInfo.email}</p>
            </div>
            <div className="space-y-3">
              <p className="label font-semibold tracking-widest uppercase">
                Shipping
              </p>
              <form className="space-y-3">
                <div>
                  <label className="text-sm text-neutral-400">Full Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Full name"
                    defaultValue={userInfo.name || ""}
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-400">
                    Phone (+880)
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Phone number"
                    defaultValue={userInfo.phone || ""}
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
                    />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-400">District</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="District"
                      defaultValue={userInfo.address.shipping.district || ""}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-400">Division</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Division"
                      defaultValue={userInfo.address.shipping.division || ""}
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
              </form>
              <div>
                <button className="btn btn-primary w-full">Place Order</button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-xl uppercase text-center font-semibold">
              Cart Summary
            </h1>
            <>
              <CartDetails />
            </>
            <div className="space-y-3">
              <p className="label font-semibold tracking-widest uppercase">
                Payment Method
              </p>
              <div className="flex items-center justify-between border border-base-300 rounded-md px-4 py-2 shadow-sm">
                <div>
                  <p className="text-lg font-semibold">Cash On Delivery</p>
                  <p className="text-sm label whitespace-normal">
                    Payment will be collected upon delivery.
                  </p>
                </div>
                <PiHandCoinsLight className="text-success w-11 h-11" />
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
}
