"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { User } from "@/models/user-model";
import { revalidatePath } from "next/cache";

export async function claimVipPass(userId) {
  if (!userId) {
    return {
      success: false,
      error: "notLoggedIn",
      message: "You have to login first",
    };
  }
  try {
    await connectToDb();
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        error: "userNotFound",
        message: "User not found.",
      };
    }
    if (user.vipPass) {
      return {
        success: false,
        error: "vipPassReclaiming",
        message: "VIP Pass already claimed. You're already a VIP customer",
      };
    }
    user.vipPass = true;
    await user.save();
    revalidatePath("/my-profile");
    return { success: true, message: "VIP Pass claimed successfully!" };
  } catch (error) {
    console.error("Error claiming VIP Pass:", error);
    return { success: false, message: "Failed to claim VIP Pass." };
  }
}
