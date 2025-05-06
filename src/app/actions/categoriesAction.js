"use server";

import { connectToDb } from "@/lib/mongoConnection";
import { Category } from "@/models/category-model";
import { revalidatePath } from "next/cache";

/**
 * Register new category
 * @param {*} formData - Form data.
 * @returns {Promise<{success: boolean, msg: string}>}
 */
export async function registerACategory(formData) {
  const name = formData.get("name");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const parent = formData.get("parent") || null;

  try {
    await connectToDb();

    const newCategory = new Category({
      name,
      slug,
      description,
      parent,
    });

    await newCategory.save();
    revalidatePath("/admin/categories");

    return {
      success: true,
      msg: "New category registered successfully",
    };
  } catch (error) {
    return {
      success: false,
      msg: error.message,
    };
  }
}

/**
 * Get all available categories
 * @returns {Promise<{success: boolean, msg: String, data?:Object}>}
 */
export async function getAvailableCategories() {
  try {
    // connect to database
    await connectToDb();

    const availableCategories = await Category.find().lean();
    // return
    return {
      success: true,
      msg: "Found categories",
      data: JSON.stringify(availableCategories),
    };
  } catch (error) {
    console.log("Error from get available categories: ", error);
    return { success: false, msg: "Unable to find categories" };
  }
}

/**
 * Modify a category
 * @param {*} formData - Form data.
 * @returns {Promise<{success: boolean, msg: string}>}
 */
export async function modifyACategory(formData) {
  const categoryId = formData.get("id");
  const name = formData.get("name");
  const slug = formData.get("slug");
  const description = formData.get("description");

  try {
    // connect to database;
    await connectToDb();

    // find by id and update
    const existingCategory = await Category.findById(categoryId);
    if (existingCategory) {
      existingCategory.name = name;
      existingCategory.slug = slug;
      existingCategory.description = description;

      await existingCategory.save();
    } else {
      return {
        success: false,
        msg: "Not found any category with the id",
      };
    }

    // revalidate paths
    revalidatePath("/admin/categories");
    // return
    return {
      success: true,
      msg: "Category modified successfully",
    };
  } catch (error) {
    // console.log("error from register a category server action: ", error);
    return {
      success: false,
      msg: error.message,
    };
  }
}

/**
 * Get a category
 * @returns {Promise<{success: boolean, msg: String, data?:Object}>}
 */
export async function getCategory(id) {
  try {
    // connect to database
    await connectToDb();

    const category = await Category.findById(id).lean();
    // return
    return {
      success: true,
      msg: "Found Category",
      data: JSON.stringify(category),
    };
  } catch (error) {
    console.log("Error from get category: ", error);
    return { success: false, msg: "Unable to find category" };
  }
}

/**
 * Fetch all main categories for parent selection.
 * @returns {Promise<{success: boolean, categories?:Array}>}
 */
export async function getMainCategories() {
  try {
    await connectToDb();
    const categories = await Category.find({ parent: null })
      .select("name _id")
      .lean();
    return { success: true, categories: JSON.stringify(categories) };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
