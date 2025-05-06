"use client";

import { modifyACategory } from "@/app/actions/categoriesAction";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditCategoryForm({ categoryString }) {
  const category = JSON.parse(categoryString);
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    //   setLoading(true)
    const form = event.currentTarget;
    try {
      const formData = new FormData(form);
      formData.append("id", category._id.toString());
      const addCategoryRes = await modifyACategory(formData);
      if (addCategoryRes.success) {
        document
          .getElementById(`edit_category_modal${category._id}_close`)
          .click();
        form.reset();
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: `Category "${category.name}" modified`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        document
          .getElementById(`edit_category_modal${category._id}_close`)
          .click();
        form.reset();
        Swal.fire({
          position: "top-right",
          icon: "error",
          title: `Unable to modify category "${category.name}"`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-right",
        icon: "error",
        title: "Something went wrong!!",
        showConfirmButton: false,
        timer: 1500,
      });
      //   console.log("error from add category form: ", error);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      {/* Category Name */}
      <div className="form-control">
        <label className="label font-semibold">Name</label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full"
          placeholder="Enter Category name"
          defaultValue={category.name}
          required
        />
      </div>

      {/* Category Slug */}
      <div className="form-control">
        <label className="label font-semibold">Slug</label>
        <input
          type="text"
          name="slug"
          className="input input-bordered w-full"
          placeholder="Enter slug"
          defaultValue={category.slug}
          required
        />
      </div>

      {/* Description */}
      <div className="form-control">
        <label className="label font-semibold">Description</label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full"
          placeholder="Enter product description"
          defaultValue={category.description}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </div>
    </form>
  );
}
