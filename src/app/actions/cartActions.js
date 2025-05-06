"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { User } from "@/models/user-model";
// import { revalidatePath } from "next/cache";

// Server action: Add to cart
export async function addToCart({ userEmail, productId, quantity = 1 }) {
  // console.log({ userEmail, productId, quantity });
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
    return {
      success: true,
      message: "Added to cart",
      // cart: JSON.stringify(user.cart),
    };
  } catch (error) {
    // console.log("got a error from addToCart server action => ", error);
    return { success: false, message: "Something went wrong", error };
  }
}

// TODO: Refactor
// get cart
export async function getCart(userEmail) {
  // console.log("Fetching cart for:", userEmail);
  try {
    if (!userEmail) {
      return { success: false, message: "User email is required.", cart: [] };
    }

    await connectToDb();

    const user = await User.findOne({ email: userEmail }).populate({
      path: "cart.productId",
      select: "name price discountPrice", // Select only necessary fields
    });

    if (!user || !user.cart) {
      return { success: false, message: "Shopping cart not found.", cart: [] };
    }

    // Convert Mongoose documents to plain JavaScript objects
    const cart = user.cart.map((item) => ({
      productId: item.productId._id.toString(), // Convert ObjectId to string
      name: item.productId.name,
      discountPrice: item.productId.discountPrice,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    return { success: true, cart };
  } catch (error) {
    console.error("Fetch Cart Error:", error);
    return { success: false, message: "Failed to load cart.", cart: [] };
  }
}

export async function updateCart({ userEmail, productId, quantity }) {
  // console.log("Updating product for =>", userEmail);
  // console.log({ userEmail, productId, quantity });

  try {
    // Connect to database
    // console.log("Connecting to database...");
    await connectToDb();

    // Get user from MongoDB
    // console.log("Getting user from database...");
    const user = await User.findOne({ email: userEmail })
      .select({ cart: 1 }) // Select only cart field
      .lean(); // Convert Mongoose object to plain JSON

    // Check if user exists
    if (!user) {
      // console.log("User not found.");
      return { success: false, message: "User not found." };
    }

    // Find product in user's cart
    // console.log("Finding product in user's cart...");
    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      // console.log("Product not found in cart.");
      return { success: false, message: "Product not found in cart." };
    }

    // If quantity is 0, remove the product from the cart
    if (quantity === 0) {
      // console.log("Removing product from cart...");
      user.cart.splice(productIndex, 1);
    } else {
      // console.log("Updating product quantity...");
      user.cart[productIndex].quantity = quantity;
    }

    // Save the updated cart
    // console.log("Saving updated cart...");
    await User.updateOne({ email: userEmail }, { cart: user.cart });

    // Convert ObjectId to string before returning
    const updatedCart = user.cart.map((item) => ({
      ...item,
      productId: item.productId.toString(),
      _id: item._id.toString(),
    }));

    // console.log("Cart updated successfully.");
    return {
      success: true,
      message: "Cart updated successfully.",
      cart: updatedCart,
    };
  } catch (error) {
    console.error("Error in updateCart:", error);
    return { success: false, message: "Something went wrong." };
  }
}

// remove product from cart
export async function removeFromCart({ userEmail, productId }) {
  // console.log("Deleting product for =>", userEmail);
  // console.log({ userEmail, productId });

  try {
    // Connect to database
    // console.log("Connecting to database...");
    await connectToDb();

    // Get user from MongoDB
    // console.log("Getting user from database...");
    const user = await User.findOne({ email: userEmail })
      .select({ cart: 1 }) // Select only cart field
      .lean(); // Convert Mongoose object to plain JSON

    // Check if user exists
    if (!user) {
      // console.log("User not found.");
      return { success: false, message: "User not found." };
    }

    // Find product in user's cart
    // console.log("Removing product in user's cart...");
    const restOfCart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    // Save the updated cart
    // console.log("Saving updated cart...");
    await User.updateOne({ email: userEmail }, { cart: restOfCart });

    // // Convert ObjectId to string before returning
    // const updatedCart = user.cart.map((item) => ({
    //   ...item,
    //   productId: item.productId.toString(),
    //   _id: item._id.toString(),
    // }));
    // console.log(restOfCart);
    // console.log("Cart updated successfully.");
    return {
      success: true,
      message: "Product removed from cart successfully.",
      // cart: restOfCart,
    };
  } catch (error) {
    // console.error("Error in removeFromCart:", error);
    return { success: false, message: "Something went wrong." };
  }
}
