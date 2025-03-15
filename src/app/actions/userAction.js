"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { User } from "@/models/user-model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

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
      .select("name email image address phone nid role createdAt") // Expose only necessary fields
      .lean();

    return user
      ? { success: true, user }
      : { success: false, message: "User not found." };
  } catch (error) {
    console.error("getUserById Error:", error);
    return { success: false, message: "Failed to fetch user." };
  }
}

// modify user
export async function editUser(formData, id) {
  console.log("User edit function called...");
  console.log("Connecting to database...");
  try {
    await connectToDb();
    console.log("building new object from fromData...");
    const newUserObj = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      nid: formData.get("nid"),
      address: {
        permanent: {
          city: formData.get("city_permanent"),
          district: formData.get("district_permanent"),
          division: formData.get("division_permanent"),
          zip: formData.get("zip_permanent"),
        },
        shipping: {
          city: formData.get("city_shipping"),
          district: formData.get("district_shipping"),
          division: formData.get("division_shipping"),
          zip: formData.get("zip_shipping"),
        },
      },
    };
    console.log("new user object: ", newUserObj, { id });
    const userUpdateRes = await User.findByIdAndUpdate(id, {
      $set: newUserObj,
    });
    console.log("After update request: ", userUpdateRes);
    revalidatePath("/my-profile/edit");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
