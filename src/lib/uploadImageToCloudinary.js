// lib/uploadImageToCloudinary.js
import cloudinary from "@/lib/cloudinary.config";

export async function uploadImageToCloudinary(fileBuffer) {
  try {
    const base64 = fileBuffer.toString("base64");
    const uploadRes = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64}`,
      { folder: "next-commerz-products" }
    );

    if (!uploadRes.secure_url) {
      throw new Error("Cloudinary upload failed.");
    }

    return uploadRes.secure_url;
  } catch (error) {
    throw new Error("Image upload failed: " + error.message);
  }
}
