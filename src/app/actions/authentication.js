"use server";
import { auth, signIn, signOut } from "@/auth";
import cloudinary from "@/lib/cloudinary.config";
import { sendResetEmail } from "@/lib/mailer";
import { connectToDb } from "@/lib/mongoConnection";
import { User } from "@/models/user-model";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// social logins
export async function socialLogin(formData) {
  const action = formData.get("action");
  // console.log(action);
  await signIn(action, { redirectTo: "/" });
}

// logout
export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
const isValidPassword = (pass) => {
  return pass && pass.length >= 8; // Minimum 8 characters
};

// Function to hash password
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export const registerUser = async (formData) => {
  try {
    // console.log("Registering user...");
    await connectToDb();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const file = formData.get("dp_image");

    if (!name || !email || !password) {
      // console.log("Missing required fields");
      return { success: false, message: "All fields are required" };
    }

    let imageUrl = "";
    if (file) {
      // console.log("Uploading file to Cloudinary...");

      // Convert file to buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Upload directly using Cloudinary's upload method
      const uploadResponse = await cloudinary.uploader.upload(
        `data:image/png;base64,${buffer.toString("base64")}`,
        "next-commerz-p1",
        {
          folder: "user_profile_images",
        }
      );

      if (!uploadResponse.secure_url) {
        // console.error("Cloudinary upload failed, no secure_url returned");
        return { success: false, message: "Image upload failed" };
      }

      imageUrl = uploadResponse.secure_url;
      // console.log("Image uploaded successfully:", imageUrl);
    }

    // Hash password
    console.log("Hashing password...");
    const hashedPass = await hashPassword(password);
    console.log("Password hashed.");

    // Create & save new user
    const newUser = new User({
      name,
      email,
      password: hashedPass,
      image: imageUrl,
    });

    // console.log("Saving user to database...");
    await newUser.save();

    console.log("User registered successfully");
    return { success: true, message: "User registered successfully", imageUrl };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Registration failed" };
  }
};

// credential login
export async function credentialLogin(formData) {
  console.log(formData);
  try {
    // calling signin function with spreading formData object with additional redirect false
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

// Send password reset request server action
export async function sendResetRequest(email) {
  try {
    // Validate email
    if (!isValidEmail(email)) {
      return {
        success: false,
        message: "Invalid email format.",
      };
    }

    await connectToDb();

    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour from now

    user.resetToken = token;
    user.resetTokenExpiry = expiryDate.toISOString();
    await user.save();

    await sendResetEmail(email, token);

    return {
      success: true,
      message: "Password reset email sent.",
    };
  } catch (error) {
    console.error("Error in sendResetRequest:", error.message);
    return {
      success: false,
      message: "Failed to send reset email. Please try again later.",
    };
  }
}

// Reset password server action
export async function resetPassword(token, pass) {
  try {
    // Validate password
    if (!isValidPassword(pass)) {
      return {
        success: false,
        message: "Password must be at least 8 characters long.",
      };
    }

    await connectToDb();

    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return {
        success: false,
        message: "Invalid token.",
      };
    }

    // Check if token is expired
    if (user.resetTokenExpiry) {
      const currentDate = new Date();
      const tokenExpiryDate = new Date(user.resetTokenExpiry);

      if (currentDate > tokenExpiryDate) {
        return {
          success: false,
          message: "Token has expired.",
        };
      }
    } else {
      return {
        success: false,
        message: "Invalid token.",
      };
    }

    // Update password and clear reset token fields
    user.password = await hashPassword(pass);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return {
      success: true,
      message: "Password reset successfully.",
    };
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    return {
      success: false,
      message: "An error occurred while resetting the password.",
    };
  }
}

// change password
export async function changePassword(formData) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    // Connect to MongoDB
    await connectToDb();

    const { current_pass, new_pass, confirm_new_pass } =
      Object.fromEntries(formData);

    // Basic validation
    if (!current_pass || !new_pass || !confirm_new_pass) {
      throw new Error("All fields are required.");
    }

    if (new_pass !== confirm_new_pass) {
      throw new Error("New password and confirmation do not match.");
    }

    // Fetch user from DB
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      throw new Error("User not found.");
    }

    // Check current password
    const isMatch = await bcrypt.compare(current_pass, user.password);
    if (!isMatch) {
      throw new Error("Current password is incorrect.");
    }

    // Hash new password
    const hashedPassword = await hashPassword(new_pass);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Optionally redirect or return a success message
    return { success: true, message: "Password updated successfully." };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something went wrong.",
    };
  }
}
