"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { Rating } from "@/models/rating-model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

// your db connection util

export async function addRating({
  productId,
  userEmail,
  ratingValue,
  comment,
}) {
  try {
    await connectToDb();

    // Check if the user already rated the product
    const existing = await Rating.findOne({ productId, userEmail });
    if (existing) {
      return {
        success: false,
        message: "You have already rated this product.",
      };
    }

    const rating = await Rating.create({
      productId,
      userEmail,
      ratingValue,
      comment,
    });
    revalidatePath(`/products/${productId}`);
    return { success: true, data: rating };
  } catch (error) {
    console.error("Add Rating Error:", error);
    return { success: false, message: "Failed to add rating." };
  }
}

export async function getRatingsForProduct(productId) {
  try {
    await connectToDb();
    const ratings = await Rating.find({ productId }).sort({ createdAt: -1 });
    return { success: true, data: ratings };
  } catch (error) {
    console.error("Fetch Ratings Error:", error);
    return { success: false, message: "Failed to fetch ratings." };
  }
}

export async function getAverageRating(productId) {
  try {
    await connectToDb();

    // Convert to ObjectId if needed
    const isValid = mongoose.Types.ObjectId.isValid(productId);
    if (!isValid) {
      return { success: false, message: "Invalid productId format." };
    }

    const ratings = await Rating.find({
      productId: new mongoose.Types.ObjectId(productId),
    }).lean();

    if (ratings.length === 0) {
      return { success: true, data: 0 }; // No ratings yet
    }

    // Calculate average
    const sum = ratings.reduce((acc, curr) => acc + curr.ratingValue, 0);
    const average = sum / ratings.length;

    return { success: true, data: average };
  } catch (error) {
    console.error("getAverageRating error:", error.message);
    return { success: false, message: "Failed to calculate average rating." };
  }
}
