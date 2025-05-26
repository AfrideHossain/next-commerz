import { getOrdersByUid } from "@/app/actions/orderAdminAction";
import { auth } from "@/auth";
import { formatPrice } from "@/utils/utils";

export default async function MyOrdersPage() {
  const session = await auth();

  let orders = [];
  try {
    const res = await getOrdersByUid(session?.user?.id);
    if (res.success) {
      orders = res.orders;
    }
    console.log(orders);
  } catch (error) {
    throw new Error("Something went wrong");
  }
  return (
    <div className="px-2">
      <h1 className="text-xl md:text-3xl font-semibold">My Orders</h1>

      <div className="space-y-2 mt-5">
        {orders.map((order) => (
          <div className="border border-gray-400 rounded p-4 space-y-2">
            <h3 className="text-xl font-medium">{order.orderId}</h3>
            <div className="flex gap-10">
              <p className="text-gray-400">
                Order at:{" "}
                <span>
                  {new Date(order.orderDate).toLocaleString().toString()}
                </span>
              </p>
              <p className="text-gray-400">
                Grand total: <span>{formatPrice(order.grandTotal)} Taka</span>
              </p>
            </div>
            <div className="flex gap-10">
              <p className="text-gray-400">
                Status:{" "}
                <span
                  className={`badge ${
                    order.status === "confirmed"
                      ? "badge-info"
                      : order.status === "pending"
                      ? "badge-neutral"
                      : order.status === "shipped"
                      ? "badge-success"
                      : "badge-error"
                  } uppercase`}
                >
                  {order.status}
                </span>
              </p>
              {order.status === "declined" && (
                <p className="text-error">
                  Issue: <span>{order.declinedIssue}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
