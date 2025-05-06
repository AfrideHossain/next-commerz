import { getAllOrders } from "@/app/actions/orderAdminAction";
import OrderTableComp from "@/components/orders/OrderTableComp";

export default async function AdminOrders() {
  let orders = [];
  const ordersReq = await getAllOrders();
  if (ordersReq.success) {
    orders = JSON.parse(ordersReq.data);
  }
  // console.log(orders[0].products);
  return (
    <div>
      <OrderTableComp orders={orders} />
    </div>
  );
}
