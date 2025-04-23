"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { Order } from "@/models/order-model";
import { Product } from "@/models/product-model";
import { User } from "@/models/user-model";
import { createDynamicTrackingState } from "next/dist/server/app-render/dynamic-rendering";

// get length of products, users and orders
export async function getLenProductsUsersOrders() {
  // initial statObj
  let statObj = { products: 0, users: 0, orders: 0 };

  try {
    // connect to the database
    await connectToDb();
    // get products and set the length to statObj
    const productsLen = await Product.find({}).select({ stock: 1 }).lean();
    if (productsLen) statObj.products = productsLen.length;

    // get users and set the length to statObj
    const usersLen = await User.find({ role: "user" })
      .select({ _id: 1 })
      .lean();
    if (usersLen) statObj.users = usersLen.length;

    //get orders and set the length to statObj
    const ordersLen = await Order.find({ status: "pending" })
      .select({ _id: 1 })
      .lean();
    if (ordersLen) statObj.orders = ordersLen.length;
    // console.log(statObj);
    return statObj;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// get users
export async function getUsers() {
  try {
    await connectToDb();
    const users = await User.find().select({ password: 0, cart: 0 }).lean();
    // console.log(users);
    return users;
  } catch (error) {
    console.error("error from getUsers function => ", error);
  }
}
//get user by id
export async function getUserByIdAdminAction({ id }) {
  try {
    await connectToDb();
    const user = await User.findById(id)
      .select({
        name: 1,
        email: 1,
        role: 1,
        createdAt: 1,
      })
      .lean();
    if (user) {
      return user;
    } else {
      throw new Error("User not found by the id");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
