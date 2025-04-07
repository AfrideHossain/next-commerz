"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { Order } from "@/models/order-model";
import { revalidatePath } from "next/cache";
/**
 * Fetches orders based on order status
 * @param {string} status - Order status.
 * @returns {Promise<{success: boolean, msg: string}>}   */
export async function getAllOrders(status) {
  try {
    // connect to database
    // console.log("connecting to database...");
    await connectToDb();

    // getting orders based on status
    let query = {};
    if (status) {
      status = { status };
    }
    const orders = await Order.find(query)
      .lean()
      .populate({
        path: "products.productId",
        select: "name price",
      })
      .populate({
        path: "userId",
        select: "name email",
      })
      .sort({ createdAt: -1 });
    // console.log(`Successfully retrieved ${orders.length} orders.`);
    return {
      success: true,
      message: "Orders retrieved successfully.",
      data: orders,
    };
  } catch (error) {
    // handle error
    console.log("Error from get all orders function: ", error);
    return {
      success: true,
      message: "Orders retrieve operation failed.",
    };
  }
}

/**
 * Change order's status
 * @param {string} orderId
 * @param {string} status
 * @returns {Promise<{success: boolean, msg: string}>}
 */
export async function changeOrderStatus(orderId, status) {
  console.log({ orderId, status });
  try {
    // connect to database
    console.log("connecting to database...");
    await connectToDb();
    // database operation to change status
    const changeStatusRes = await Order.findByIdAndUpdate(orderId, {
      $set: {
        status,
      },
    });
    console.log(changeStatusRes);
    revalidatePath("/admin/orders");
    return { success: true, msg: "Order status has been changed." };
  } catch (error) {
    console.log("Error from change order server action: ", error);
  }
}
