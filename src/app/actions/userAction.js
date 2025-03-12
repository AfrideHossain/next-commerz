"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { User } from "@/models/user-model";
import mongoose from "mongoose";

/**
 * Fetches a user by ID.
 * @param {string} id - The user ID.
 * @returns {Promise<{ success: boolean, user?: object, message?: string }>}
 */
export async function getUserById(id) {
  if (!mongoose.isValidObjectId(id)) {
    return { success: false, message: "Invalid user ID." };
  }

  try {
    await connectToDb();

    const user = await User.findById(id)
      .select("name email image role createdAt") // Expose only necessary fields
      .lean();

    return user
      ? { success: true, user }
      : { success: false, message: "User not found." };
  } catch (error) {
    console.error("getUserById Error:", error);
    return { success: false, message: "Failed to fetch user." };
  }
}
