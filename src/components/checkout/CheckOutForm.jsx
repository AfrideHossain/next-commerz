"use client";

export default function CheckOutForm({ userInfoString }) {
  // parsed userInfo
  const userInfo = JSON.parse(userInfoString);
  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
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
