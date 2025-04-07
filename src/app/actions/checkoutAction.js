"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { Order } from "@/models/order-model";
import { User } from "@/models/user-model";
import { revalidatePath, revalidateTag } from "next/cache";

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
    // add order information to order collection.
    let orderProducts = [];
    cart.map((item) =>
      orderProducts.push({ productId: item.productId, quantity: item.quantity })
    );
    const newOrder = new Order({
      userId: uid,
      products: orderProducts,
      deliveryCharge: charges.shipping,
      shipping: {
        name: shipping_name,
        phne: shipping_phone,
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
    revalidatePath("/admin/orders")
    return { success: true, msg: "Checkout operation successful" };
  } catch (error) {
    console.log("Error from order checkout server action: ", error);
    return { success: false, msg: "Checkout operation failed" };
  }
}
