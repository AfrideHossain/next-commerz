"use server";

import cloudinary from "@/lib/cloudinary.config";
import { connectToDb } from "@/lib/mongoConnection";
import { Product } from "@/models/product-model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { workAsyncStorage } from "next/dist/server/app-render/entry-base";

export async function addProduct(formData) {
  try {
    await connectToDb();

    // get every field from form data
    const name = formData.get("name");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const discountPrice = formData.get("discountPrice");
    const productImage = formData.get("productImage");
    const tags = formData.get("tags");

    // split tags and make an array
    const tagsArr = tags.split(/\s*,\s*/);
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
        return { success: false, message: "Image upload failed" };
      }

      imageUrl = uploadResponse.secure_url;
    }

    // console.log({
    //   name,
    //   category,
    //   tags: tagsArr,
    //   price,
    //   stock,
    //   discountPrice,
    //   description,
    //   image: imageUrl,
    // });
    // create document
    const newProduct = new Product({
      name,
      category,
      tags: tagsArr,
      price,
      stock,
      discountPrice,
      description,
      image: imageUrl,
    });

    // save to database
    await newProduct.save();
    // revalidate paths
    revalidatePath("/products");
    revalidatePath("/admin/products");
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
/**
 * @param {Number} limit
 */
export async function getAllProducts(limit = 0) {
  try {
    await connectToDb(); // Ensure the database is connected
    const products = await Product.find().limit(limit).lean(); // Use `lean()` for better performance
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

// Modify a product
export async function editAProduct(formData) {
  try {
    await connectToDb();

    const id = formData.get("id");
    const name = formData.get("name");
    const category = formData.get("category");
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const discountPrice = Number(formData.get("discountPrice"));
    const description = formData.get("description");
    const file = formData.get("productImage");

    if (!id) {
      return { success: false, message: "Product ID is required." };
    }

    const product = await Product.findById(id);
    if (!product) {
      return { success: false, message: "Product not found." };
    }

    let imageUrl = product.image; // Keep old image if no new file is uploaded

    if (file) {
      console.log("Got the image. Started uploading...");
      // convert file to buffer
      const buffer = Buffer.from(await file.arrayBuffer());
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

    // Update product in the database
    product.name = name;
    product.category = category;
    product.price = price;
    product.stock = stock;
    product.discountPrice = discountPrice;
    product.description = description;
    product.image = imageUrl;

    await product.save();
    // Revalidate the product page and product list
    revalidatePath(`/products/${product._id}`);
    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true, message: "Product updated successfully!" };
  } catch (error) {
    console.error("Edit Product Error:", error);
    return { success: false, message: "Failed to update product." };
  }
}

// Server action to delete a product by it's id
export async function deleteAProduct(id) {
  try {
    // connect to database
    console.log("connecting to database...");
    await connectToDb();
    const deleteRes = await Product.findByIdAndDelete(id);
    console.log(deleteRes);
    if (deleteRes) {
      revalidatePath("/admin/products");
      return true;
    } else {
      throw new Error("Unable to delete the product.");
    }
  } catch (error) {
    throw new Error(error);
  }
}

// get all products
/**
 * @param {Number} limit
 * @param {String} category
 */
export async function getProductsByCat(category, limit = 0) {
  try {
    console.log({ category });
    await connectToDb(); // Ensure the database is connected
    const products = await Product.find({ category }).limit(limit).lean(); // Use `lean()` for better performance
    console.log("Products under getProductsByCat: ", products);
    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, message: "Failed to fetch products" };
  }
}
// Todo: Refactor
// server action for fetching products based on tags
export async function getProductsByTag(tagName) {
  // try catch for error handling
  try {
    // establish database connection
    await connectToDb();
    // get products that matched tagname(single)
    const products = await Product.find({ tags: { $in: tagName } })
      .limit(5)
      .lean();

    // console logging for debugging
    console.log(products);
    // send response to api
    if (products) {
      return { success: true, products, message: "product found with the tag" };
    } else {
      return { success: false, message: "products not found" };
    }
  } catch (error) {
    console.log("Error from server action ", error);
    // throw new Error(error);
  }
}
