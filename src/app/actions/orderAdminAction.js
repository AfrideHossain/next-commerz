"use server";

import { emailSender } from "@/lib/mailer";
import { connectToDb } from "@/lib/mongoConnection";
import { Order } from "@/models/order-model";
import { revalidatePath } from "next/cache";
// =========== mail functions start ===========
// Confirmation mail
async function sendConfirmationMail(
  orderId,
  customerName,
  orderDate,
  totalAmount
) {
  const html = `<div style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #00ba7b; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Woohoo! Your Order is Confirmed!</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Hi ${customerName},
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                You’re awesome for shopping with us! We’ve got your order locked in and we’re busy getting it ready for you. Here’s a quick peek at what you ordered:
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                <strong>Order ID:</strong> ${orderId}<br>
                <strong>Placed On:</strong> ${orderDate}<br>
                <strong>Total:</strong> ${totalAmount} Taka
              </p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/my-orders/${orderId}" style="display: inline-block; padding: 12px 24px; background-color: #00ba7b; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px; font-weight: bold;">
                  Check Your Order
                </a>
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Got questions? Hit us up at <a href="mailto:thereisnoonelikeafride@gmail.com" style="color: #007bff; text-decoration: none;">thereisnoonelikeafride@gmail.com</a>. We’re here for you!
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">
                Can’t wait to get this to you!<br>
                The JADUR HAAT Crew
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666666;">
              <p style="margin: 0 0 10px;">
                © 2025 JADUR HAAT. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>`;

  await emailSender(
    process.env.EMAIL_USER,
    `Woohoo! Your Order(${orderId}) is Confirmed!`,
    html
  );
}
// Shipped mail
async function sendShippedMail(
  orderId,
  customerName,
  shippedDate,
  estimatedDelivery
) {
  const html = `<div style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #00ba7b; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Your Order is On Its Way!</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Hi ${customerName},
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Get excited—your order is officially out the door and speeding toward you! You’ll have it in your hands before you know it.
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                <strong>Order ID:</strong> ${orderId}<br>
                <strong>Shipped On:</strong> ${shippedDate}<br>
                <strong>Estimated Delivery:</strong> ${estimatedDelivery}
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Questions? We’re just an email away at <a href="mailto:thereisnoonelikeafride@gmail.com" style="color: #007bff; text-decoration: none;">thereisnoonelikeafride@gmail.com</a>.
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">
                Can’t wait for you to enjoy this!<br>
                The JADUR HAAT Crew
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666666;">
              <p style="margin: 0 0 10px;">
                © 2025 JADUR HAAT. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>`;

  await emailSender(
    process.env.EMAIL_USER,
    `Your Order(${orderId}) is On Its Way!`,
    html
  );
}
// Declined mail
async function sendDeclinedMail(
  orderId,
  customerName,
  orderDate,
  declineReason
) {
  const html = `<div style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #00ba7b; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Oh No, Your Order Needs Attention</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Hi ${customerName},
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                We’re really sorry, but we hit a snag with your order and couldn’t process it this time. Don’t worry, we’re here to help sort things out!
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                <strong>Order ID:</strong> ${orderId}<br>
                <strong>Placed On:</strong> ${orderDate}<br>
                <span style="color: #cf1406;"><strong>Issue:</strong> ${declineReason}</span>
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Need help? Reach out to us at <a href="mailto:thereisnoonelikeafride@gmail.com" style="color: #007bff; text-decoration: none;">thereisnoonelikeafride@gmail.com</a>. We’ve got your back!
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">
                Let’s get this sorted,<br>
                The JADUR HAAT Crew
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666666;">
              <p style="margin: 0 0 10px;">
                © 2025 JADUR HAAT. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>`;

  await emailSender(
    process.env.EMAIL_USER,
    `Oh No, Your Order(${orderId}) Needs Attention`,
    html
  );
}
// =========== mail functions end ===========

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
    // console.log({ status });
    let query = {};
    if (status) {
      query = { status };
    }
    // console.log({ query });
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
 * @param {{message?:string}} options
 * @returns {Promise<{success: boolean, msg: string}>}
 */
export async function changeOrderStatus(orderId, status, options) {
  try {
    // connect to database
    // console.log("connecting to database...");
    await connectToDb();
    // database operation to change status

    if (status === "confirmed") {
      const changeStatusRes = await Order.findByIdAndUpdate(orderId, {
        $set: {
          status,
        },
      });

      // console.log("order status changed to confirmed => ", changeStatusRes);
      await sendConfirmationMail(
        changeStatusRes.orderId,
        changeStatusRes.shipping.name,
        changeStatusRes.orderDate,
        changeStatusRes.grandTotal
      );
    }
    if (status === "shipped") {
      const shippedDate = new Date();
      const estimatedDelivery = new Date(Date.now() + 3600000 * (24 * 5)); //increased 5 days
      const changeStatusRes = await Order.findByIdAndUpdate(orderId, {
        $set: {
          status,
          shippedDate,
        },
      });
      // console.log("order status changed to shipped => ", changeStatusRes);
      await sendShippedMail(
        changeStatusRes.orderId,
        changeStatusRes.shipping.name,
        shippedDate,
        estimatedDelivery
      );
    }
    if (status === "declined") {
      // do something
      const changeStatusRes = await Order.findByIdAndUpdate(orderId, {
        $set: {
          status,
          declinedIssue: options.message,
        },
      });
      // console.log("order status changed to shipped => ", changeStatusRes);
      await sendDeclinedMail(
        changeStatusRes.orderId,
        changeStatusRes.shipping.name,
        changeStatusRes.orderDate,
        options.message
      );
    }
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
  // console.log(orderId);
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
      // console.log(orderDetailsRes);
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
