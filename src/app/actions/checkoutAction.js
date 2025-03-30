"use server";

import { connectToDb } from "@/lib/mongoConnection";

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
    const charges = formData.get("charges");
    const cart = formData.get("cart");
    const requestObj = {
      uid,
      shipping_name,
      shipping_phone,
      shipping_city,
      shipping_district,
      shipping_division,
      shipping_zip,
      charges,
      cart,
    };

    console.log(requestObj);

    return { success: true };
  } catch (error) {
    console.log("Error from order checkout server action: ", error);
  }
}
