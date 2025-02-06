"use server";
import { signIn, signOut } from "@/auth";
import cloudinary from "@/lib/cloudinary.config";
import { connectToDb } from "@/lib/mongoConnection";
import { User } from "@/models/user-model";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";

// social logins
export async function socialLogin(formData) {
  const action = formData.get("action");
  // console.log(action);
  await signIn(action, { redirectTo: "/home" });
}

// logout
export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}

// Function to hash password
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Main user registration function - temporarily disabled
/* export async function registerUser(formData) {
  console.log("Registering user...");

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const file = formData.get("dp_image");

  try {
    // Connect to database
    await connectToDb();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return { success: false, message: "User already exists" };
    }
    let uploadImageRes = null;
    if (file) {
      // Get the file path if it exists, or read the file if it's in memory
      const filePath = file.path
        ? file.path
        : await file.arrayBuffer().then((buffer) => {
            const tempFilePath = `/tmp/${file.name}`; // Create temporary path
            return fs
              .writeFile(tempFilePath, Buffer.from(buffer))
              .then(() => tempFilePath);
          });
      uploadImageRes = await cloudinary.uploader.upload(
        filePath,
        "next-commerz-p1",
        {
          folder: "user_profile_images",
        }
      );
    }

    // Hash password
    const hashedPass = await hashPassword(password);

    // Create & save new user
    const newUser = new User({
      name,
      email,
      password: hashedPass,
      image: uploadImageRes?.secure_url || "",
    });
    await newUser.save();

    console.log("User registered successfully");
    return { success: true, imageUrl };
  } catch (error) {
    console.error("Error:", error.message);
    return { success: false, message: error.message };
  }
} */

// temporary code
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
