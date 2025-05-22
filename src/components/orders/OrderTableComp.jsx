import Link from "next/link";
import ChangeOrderStatusBtn from "./ChangeOrderStatusBtn";

export default function OrderTableComp({ orders }) {
  const hasOrders = orders && orders.length > 0;

  return (
    <div className="w-full">
      {/* No Orders */}
      {!hasOrders && (
        <div className="h-[60vh] flex items-center justify-center text-center text-lg text-gray-400">
          No orders found.
        </div>
      )}

      {/* Orders Exist */}
      {hasOrders && (
        <div className="mt-10 bg-gray-800 p-4 md:p-6 rounded-lg">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
            All Orders
          </h2>

          {/* Table for Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Order ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email & Phone</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  // const totalAmount =
                  //   order.products.reduce(
                  //     (acc, product) =>
                  //       acc + product?.productId?.price * product?.quantity,
                  //     0
                  //   ) + parseFloat(order?.deliveryCharge || 0);

                  return (
                    <tr
                      key={order._id.toString()}
                      className="border-t border-gray-700"
                    >
                      <td className="p-2 break-all">{order.orderId}</td>
                      <td className="p-2">{order?.shipping?.name}</td>
                      <td className="p-2 space-y-1">
                        <p>{order?.userId?.email}</p>
                        <p className="text-xs">
                          {order?.shipping?.phone || (
                            <span className="text-red-400">
                              No phone provided
                            </span>
                          )}
                        </p>
                      </td>
                      <td className="p-2 text-yellow-400">
                        {/* {totalAmount} */}
                        {order.grandTotal} Taka
                      </td>
                      <td className="p-2">
                        <span
                          className={`badge uppercase text-xs ${
                            order.status === "pending"
                              ? "badge-warning"
                              : order.status === "shipped"
                              ? "badge-success"
                              : order.status === "confirmed"
                              ? "badge-info"
                              : "badge-error"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/admin/orders/${order._id}`}
                            className="btn btn-xs btn-ghost text-warning"
                          >
                            View
                          </Link>
                          <ChangeOrderStatusBtn
                            className="btn btn-xs btn-ghost text-info"
                            status="confirmed"
                            orderId={order._id.toString()}
                          >
                            Confirm
                          </ChangeOrderStatusBtn>
                          <ChangeOrderStatusBtn
                            className="btn btn-xs btn-ghost text-error"
                            status="declined"
                            orderId={order._id.toString()}
                          >
                            Decline
                          </ChangeOrderStatusBtn>
                          <ChangeOrderStatusBtn
                            className="btn btn-xs btn-ghost text-success"
                            status="shipped"
                            orderId={order._id.toString()}
                          >
                            Ship
                          </ChangeOrderStatusBtn>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cards for Mobile */}
          <div className="block md:hidden space-y-4">
            {orders.map((order) => {
              const totalAmount =
                order.products.reduce(
                  (acc, product) =>
                    acc + product?.productId?.price * product?.quantity,
                  0
                ) + parseFloat(order?.deliveryCharge || 0);

              return (
                <div
                  key={order._id.toString()}
                  className="bg-gray-700 rounded-lg p-4 text-white shadow"
                >
                  <p className="text-sm text-gray-400 break-all">
                    Order ID: <span className="text-white">{order._id}</span>
                  </p>
                  <p className="mt-1 font-semibold">
                    Name: {order?.shipping?.name}
                  </p>
                  <p className="text-sm text-gray-300">
                    Email: {order?.userId?.email}
                  </p>
                  <p className="text-sm text-gray-300">
                    Phone:{" "}
                    {order?.shipping?.phone || (
                      <span className="text-red-400">Not provided</span>
                    )}
                  </p>
                  <p className="mt-1 text-yellow-400 font-semibold">
                    Total: {totalAmount} Taka
                  </p>
                  <p className="mt-1">
                    <span
                      className={`badge text-xs uppercase ${
                        order.status === "pending"
                          ? "badge-warning"
                          : order.status === "shipped"
                          ? "badge-success"
                          : order.status === "confirmed"
                          ? "badge-info"
                          : "badge-error"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="btn btn-xs btn-ghost text-warning"
                    >
                      View
                    </Link>
                    <ChangeOrderStatusBtn
                      className="btn btn-xs btn-ghost text-info"
                      status="confirmed"
                      orderId={order._id.toString()}
                    >
                      Confirm
                    </ChangeOrderStatusBtn>
                    <ChangeOrderStatusBtn
                      className="btn btn-xs btn-ghost text-error"
                      status="declined"
                      orderId={order._id.toString()}
                    >
                      Decline
                    </ChangeOrderStatusBtn>
                    <ChangeOrderStatusBtn
                      className="btn btn-xs btn-ghost text-success"
                      status="shipped"
                      orderId={order._id.toString()}
                    >
                      Ship
                    </ChangeOrderStatusBtn>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
