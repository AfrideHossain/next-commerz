"use server";

import { v4 as uuidv4 } from "uuid";
import { connectToDb } from "@/lib/mongoConnection";
import { Order } from "@/models/order-model";
import { User } from "@/models/user-model";
import { revalidatePath, revalidateTag } from "next/cache";
import { emailSender } from "@/lib/mailer";

// Function to generate unique order ID
function generateOrderId() {
  const prefix = "ORD-";
  const uniqueId = uuidv4().replace(/-/g, "").slice(0, 12); // Shorten UUID to 12 chars
  return `${prefix}${uniqueId}`;
}

// function to send email for new order to administrations
async function sendNewOrderMailToAdmin(
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
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Order Alert!</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Hey there, Admin!
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Awesome news! A fresh order just landed in our system, and it’s ready for your magic touch. Check out the details below and let’s get this rolling!
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                <strong>Order ID:</strong> ${orderId}<br>
                <strong>Customer:</strong> ${customerName}<br>
                <strong>Placed On:</strong> ${orderDate}<br>
                <strong>Total:</strong> ${totalAmount} Taka Only
              </p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders/${orderId}" style="display: inline-block; padding: 12px 24px; background-color: #00ba7b; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px; font-weight: bold;">
                  Dive Into the Details
                </a>
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">
                Let’s make this order shine!<br>
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
    `(${orderId}) New Order Alert!`,
    html
  );
}

export async function orderCheckout(formData) {
  try {
    console.log("Connecting to database...");
    await connectToDb();
    // extract data from formdata
    const uid = formData.get("userId");
    const shipping_name = formData.get("name");
    const shipping_phone = formData.get("phone");
    const shipping_city = formData.get("shipping_city");
    const shipping_district = formData.get("shipping_district");
    const shipping_division = formData.get("shipping_division");
    const shipping_zip = formData.get("shipping_zip");
    const charges = JSON.parse(formData.get("charges"));
    const cart = JSON.parse(formData.get("cart"));
    const vipPass = JSON.parse(formData.get("vipPass")) || false;

    console.log({ vipPass });
    // generate unique id
    const orderId = generateOrderId();
    // order date
    const orderDate = new Date();

    // add order information to order collection.
    const orderProducts = cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.discountPrice ?? item.price,
    }));
    // let orderProducts = [];
    // cart.map((item) =>
    //   orderProducts.push({
    //     productId: item.productId,
    //     quantity: item.quantity,
    //     price: item.discountPrice ?? item.price,
    //   })
    // );
    console.log("orderedProducts => ", orderProducts[0]);
    // calculate grand total
    let total = orderProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (vipPass) {
      total *= 0.95;
    }
    const newOrder = new Order({
      userId: uid,
      orderId,
      products: orderProducts,
      deliveryCharge: charges.shipping,
      grandTotal: total + charges.shipping,
      orderDate,
      shipping: {
        name: shipping_name,
        phone: shipping_phone,
        address: {
          city: shipping_city,
          district: shipping_district,
          division: shipping_division,
          zip: shipping_zip,
        },
      },
    });
    // console.log(orderObj);
    // save collection
    await newOrder.save();
    // clear user's cart
    const clearUserCart = await User.findByIdAndUpdate(uid, {
      $set: {
        cart: [],
      },
    });
    // send mail
    sendNewOrderMailToAdmin(
      orderId,
      shipping_name,
      orderDate,
      total + charges.shipping
    );
    revalidatePath("/admin/orders");
    return { success: true, msg: "Checkout operation successful" };
  } catch (error) {
    console.log("Error from order checkout server action: ", error);
    return { success: false, msg: "Checkout operation failed" };
  }
}
