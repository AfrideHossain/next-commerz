import ChangeOrderStatusBtn from "./ChangeOrderStatusBtn";

export default function OrderTableComp({ orders }) {
  return (
    <>
      {!orders.length > 0 && "Not found any orders"}
      {orders.length > 0 && (
        <div className="mt-10 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold">All Orders</h2>
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-sm">
                <th>OrderID</th>
                <th>Name</th>
                <th>Email & Phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id.toString()}>
                  <th>{order._id.toString()}</th>
                  <td>{order.shipping.name}</td>
                  <td className="space-y-1">
                    <p>{order.userId.email}</p>
                    <p>
                      {order.shipping.phone || (
                        <span className="text-red-600">
                          Phone number not found
                        </span>
                      )}
                    </p>
                  </td>
                  <td>
                    <p>
                      {order.products.reduce(
                        (acc, product) =>
                          acc + product.productId.price * product.quantity,
                        0
                      ) + parseFloat(order.deliveryCharge || 0)}{" "}
                      Taka
                    </p>
                  </td>
                  <td>
                    <p
                      className={`badge ${
                        order.status === "pending"
                          ? "badge-warning"
                          : order.status === "shipped"
                          ? "badge-success"
                          : order.status === "confirmed"
                          ? "badge-info"
                          : "badge-error"
                      } uppercase`}
                    >
                      {order.status}
                    </p>
                  </td>
                  <td>
                    <div className="join">
                      <ChangeOrderStatusBtn
                        className="btn btn-sm btn-ghost text-info join-item"
                        status={"confirmed"}
                        orderId={order._id.toString()}
                      >
                        Confirm
                      </ChangeOrderStatusBtn>
                      <ChangeOrderStatusBtn
                        className="btn btn-sm btn-ghost text-error  join-item"
                        status={"declined"}
                        orderId={order._id.toString()}
                      >
                        Decline
                      </ChangeOrderStatusBtn>
                      <ChangeOrderStatusBtn
                        className="btn btn-sm btn-ghost text-success join-item"
                        status={"shipped"}
                        orderId={order._id.toString()}
                      >
                        Ship
                      </ChangeOrderStatusBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
