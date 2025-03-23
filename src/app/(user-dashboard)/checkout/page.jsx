export default function CheckOutPage() {
  return (
    <>
      <section className="flex *:w-full *:p-4 *:border">
        <div className="space-y-4">
          <div>
            <label className="label">Email</label>
            <p>afridehossain@hotmail.com</p>
          </div>
          <div className="space-y-3">
            <p className="text-2xl font-semibold">Shipping Address</p>
            <form className="space-y-3">
              <div>
                <label className="text-sm text-neutral-400">Full Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="text-sm text-neutral-400">Phone (+880)</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Phone number"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-neutral-400">City</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-400">District</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="District"
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-400">Division</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Division"
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-400">Zip Code</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Zip Code"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>cart information</div>
      </section>
    </>
  );
}
