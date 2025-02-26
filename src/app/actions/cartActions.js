"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { User } from "@/models/user-model";
// import { revalidatePath } from "next/cache";

// Server action: Add to cart
export async function addToCart({ userEmail, productId, quantity = 1 }) {
  console.log({ userEmail, productId, quantity });
  try {
    // db connection
    // console.log("Connecting to the database...");
    await connectToDb();
    // console.log("Connected to the database.");

    // checking user's existence
    // console.log("Checking if the user is existed...");
    const user = await User.findOne({ email: userEmail })
      .select({ name: 1, email: 1, cart: 1 })
      .lean();

    if (!user) {
      // console.log("user is not existed so i'm returned");
      return;
    }
    // check if the product is already in the cart
    // console.log("Checking if the product is already in the cart...");
    const existingProduct = user.cart.find(
      (item) => item.productId.toString() === productId
    );
    if (existingProduct) {
      // if product is already in cart then increase quantity
      // console.log("Product is already in cart");
      // console.log("Increasing product's quantity...");
      existingProduct.quantity += quantity;
    } else {
      // else push the product in the cart with defined quantity
      // console.log("Product is not in the cart");
      // console.log("Pushing product into the cart...");
      user.cart.push({ productId, quantity });
      // console.log("Product pushed into the cart.");
    }

    // update user and return
    await User.updateOne({ email: userEmail }, { $set: { cart: user.cart } });
    return { success: true, message: "Added to cart" };
  } catch (error) {
    // console.log("got a error from addToCart server action => ", error);
    return { success: false, message: "Something went wrong", error };
  }
}

// TODO: Refactor
// get cart
export async function getCart(userEmail) {
  console.log("Fetching cart for:", userEmail);
  try {
    if (!userEmail) {
      return { success: false, message: "User email is required.", cart: [] };
    }

    await connectToDb();

    const user = await User.findOne({ email: userEmail }).populate({
      path: "cart.productId",
      select: "name price", // Select only necessary fields
    });

    if (!user || !user.cart) {
      return { success: false, message: "Shopping cart not found.", cart: [] };
    }

    // Convert Mongoose documents to plain JavaScript objects
    const cart = user.cart.map((item) => ({
      productId: item.productId._id.toString(), // Convert ObjectId to string
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    return { success: true, cart };
  } catch (error) {
    console.error("Fetch Cart Error:", error);
    return { success: false, message: "Failed to load cart.", cart: [] };
  }
}
