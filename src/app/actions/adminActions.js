"use server";

import { Product } from "@/models/product-model";
import { User } from "@/models/user-model";

export async function getLenProductsUsersOrders() {
  // initial statObj
  let statObj = { products: 0, users: 0, orders: 0 };

  try {
    // get products and set the length to statObj
    const productsLen = await Product.find({}).select({ stock: 1 }).lean();
    if (productsLen) statObj.products = productsLen.length;

    // get users and set the length to statObj
    const usersLen = await User.find({ role: "user" })
      .select({ _id: 1 })
      .lean();
    if (usersLen) statObj.users = usersLen.length;

    //TODO: get order and set the length to statObj
    console.log(statObj);
    return statObj;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
