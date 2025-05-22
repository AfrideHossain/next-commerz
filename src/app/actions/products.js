"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { Product } from "@/models/product-model";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
import { revalidatePath } from "next/cache";

// Helper to extract and normalize product data from FormData
function extractProductData(formData) {
  return {
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")) || 0,
    discountPrice: Number(formData.get("discountPrice")) || null,
    tags: formData.get("tags")?.split(/\s*,\s*/) || [],
  };
}

export async function addProduct(formData) {
  try {
    await connectToDb();
    const productImage = formData.get("productImage");
    const productData = extractProductData(formData);

    if (productImage) {
      const buffer = Buffer.from(await productImage.arrayBuffer());
      productData.image = await uploadImageToCloudinary(buffer);
    }

    const newProduct = new Product(productData);
    await newProduct.save();

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true, message: "Product added successfully" };
  } catch (error) {
    console.error("Add Product Error:", error);
    return { success: false, message: error.message };
  }
}

export async function getAllProducts(limit = 0) {
  try {
    await connectToDb();
    const products = await Product.find().limit(limit).lean();
    return { success: true, data: products };
  } catch (error) {
    console.error("Get All Products Error:", error);
    return { success: false, message: "Failed to fetch products" };
  }
}

export async function getAProduct(id) {
  try {
    await connectToDb();
    const product = await Product.findById(id).lean();
    if (!product) throw new Error("Product not found");
    return { success: true, data: product };
  } catch (error) {
    console.error("Get A Product Error:", error);
    return { success: false, message: error.message };
  }
}

export async function editAProduct(formData) {
  try {
    await connectToDb();

    const id = formData.get("id");
    if (!id) return { success: false, message: "Missing product ID" };

    const product = await Product.findById(id);
    if (!product) return { success: false, message: "Product not found" };

    const file = formData.get("productImage");
    const productData = extractProductData(formData);

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      productData.image = await uploadImageToCloudinary(buffer);
    } else {
      productData.image = product.image; // retain old image
    }

    Object.assign(product, productData);
    await product.save();

    revalidatePath(`/products/${product._id}`);
    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    console.error("Edit Product Error:", error);
    return { success: false, message: error.message };
  }
}

export async function deleteAProduct(id) {
  try {
    await connectToDb();
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) throw new Error("Failed to delete product");

    revalidatePath("/admin/products");
    return { success: true, message: "Product deleted" };
  } catch (error) {
    console.error("Delete Product Error:", error);
    return { success: false, message: error.message };
  }
}

export async function getProductsByCat(category, limit = 0) {
  try {
    await connectToDb();
    const products = await Product.find({ category }).limit(limit).lean();
    return { success: true, data: products };
  } catch (error) {
    console.error("Get Products by Category Error:", error);
    return { success: false, message: "Failed to fetch products by category" };
  }
}

export async function getProductsByTag(tag) {
  try {
    await connectToDb();
    const products = await Product.find({ tags: { $in: [tag] } })
      .limit(5)
      .lean();

    if (!products.length) {
      return { success: false, message: "No products found for this tag" };
    }

    return { success: true, data: products };
  } catch (error) {
    console.error("Get Products by Tag Error:", error);
    return { success: false, message: error.message };
  }
}
