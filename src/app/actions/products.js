"use server";

import cloudinary from "@/lib/cloudinary.config";
import { connectToDb } from "@/lib/mongoConnection";
import { Product } from "@/models/product-model";

export async function addProduct(formData) {
  console.log("Hello I am addproduct from products server action");

  try {
    console.log("Connecting to db...");
    await connectToDb();
    console.log("Connected to db");

    // get every field from form data
    const name = formData.get("name");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const discountPrice = formData.get("discountPrice");
    const productImage = formData.get("productImage");
    // image url
    let imageUrl = "";
    //   upload Image to cloudinary
    if (productImage) {
      console.log("Got the image. Started uploading...");
      // convert file to buffer
      const buffer = Buffer.from(await productImage.arrayBuffer());
      //upload to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(
        `data:image/png;base64,${buffer.toString("base64")}`,
        "next-commerz-products",
        { folder: "next-commerz-products" }
      );
      if (!uploadResponse.secure_url) {
        // console.error("Cloudinary upload failed, no secure_url returned");
        return { success: false, message: "Image upload failed" };
      }

      imageUrl = uploadResponse.secure_url;
    }

    console.log({
      name,
      category,
      price,
      stock,
      discountPrice,
      description,
      image: imageUrl,
    });
    // create document
    const newProduct = new Product({
      name,
      category,
      price,
      stock,
      discountPrice,
      description,
      image: imageUrl,
    });

    // save to database
    await newProduct.save();
    console.log("new product registered!");
    return {
      success: true,
      message: "Product registered successfully",
    };
  } catch (error) {
    console.log("error => ", error.message);
    // throw new Error(error);
    return {
      success: false,
      message: error.message,
    };
  }
}

// get all products
export async function getAllProducts() {
  try {
    await connectToDb(); // Ensure the database is connected
    const products = await Product.find().lean(); // Use `lean()` for better performance
    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, message: "Failed to fetch products" };
  }
}

// get a product
export async function getAProduct(id) {
  try {
    await connectToDb();
    const productInfo = await Product.findById(id).lean();

    if (!productInfo) {
      throw new Error("Product not found");
    }

    return productInfo;
  } catch (error) {
    console.error("Error fetching product:", error.message);
    throw new Error("Failed to fetch product");
  }
}
