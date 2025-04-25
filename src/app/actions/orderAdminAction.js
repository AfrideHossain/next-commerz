"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { Order } from "@/models/order-model";
import { revalidatePath } from "next/cache";
/**
 * Fetches orders based on order status
 * @param {string} status - Order status.
 * @returns {Promise<{success: boolean, msg: string, data?: object}>}   */
export async function getAllOrders(status) {
  try {
    // connect to database
    // console.log("connecting to database...");
    await connectToDb();

    // getting orders based on status
    console.log({ status });
    let query = {};
    if (status) {
      query = { status };
    }
    console.log({ query });
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
      data: JSON.stringify(orders),
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
    // console.log("connecting to database...");
    await connectToDb();
    // database operation to change status
    const changeStatusRes = await Order.findByIdAndUpdate(orderId, {
      $set: {
        status,
      },
    });
    // console.log(changeStatusRes);
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true, msg: "Order status has been changed." };
  } catch (error) {
    console.log("Error from change order server action: ", error);
  }
}
/**
 *
 * @param {string} orderId
 * @returns {Promise<{success: boolean, msg: string, order?: Object}>}
 */
export async function getAnOrderById(orderId) {
  console.log(orderId);
  try {
    // connect to database
    await connectToDb();

    // check orderId if it's not empty
    if (!orderId) {
      return { success: false, msg: "Order id not found" };
    }
    // get order data with mongoose
    const orderDetailsRes = await Order.findById(orderId)
      .lean()
      .populate([
        {
          path: "products.productId",
          select: "name price",
        },
        {
          path: "userId",
          select: "name email",
        },
      ]);
    if (orderDetailsRes) {
      console.log(orderDetailsRes);
      return {
        success: true,
        msg: "Order found by id",
        order: orderDetailsRes,
      };
    } else {
      return {
        success: true,
        msg: "Order found not by id",
      };
    }
  } catch (error) {
    console.log("Error from get an order by id server action: ", error);
    return { success: false, msg: "Failed to get order details by id." };
  }
}
