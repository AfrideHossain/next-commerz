"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { Product } from "@/models/product-model";

export async function getProductsBySearch(query) {
  try {
    await connectToDb();

    // This regex is equivalent to SQL's LIKE '%query%'
    const likePattern = new RegExp(query, "i");

    const products = await Product.find({
      $or: [
        { name: { $regex: likePattern } },
        { category: { $regex: likePattern } },
      ],
    }).lean();

    console.log(products);

    return JSON.stringify(products);
  } catch (error) {
    console.error("Error in getProductsBySearch:", error);
    throw new Error("Failed to fetch products.");
  }
}
