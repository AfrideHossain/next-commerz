"use client";

import {
  getMainCategories,
  registerACategory,
} from "@/app/actions/categoriesAction";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function AddCategoryForm() {
  const [loading, setLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getMainCategories(); // You'll need to create this endpoint
      if (res.success) {
        setParentCategories(JSON.parse(resx.categories));
      }
    };
    fetchCategories();
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const formData = new FormData(form);
      const addCategoryRes = await registerACategory(formData);
      if (addCategoryRes.success) {
        document.getElementById("add_category_modal_close").click();
        form.reset();
        Swal.fire({
          icon: "success",
          title: "Yay!",
          text: "New category registered.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        form.reset();
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Unable to register new category",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong!!",
        timer: 1500,
        showConfirmButton: false,
      });
      console.log("error from add category form: ", error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      {/* Name */}
      <div className="form-control">
        <label className="label font-semibold">Name</label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Slug */}
      <div className="form-control">
        <label className="label font-semibold">Slug</label>
        <input
          type="text"
          name="slug"
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Description */}
      <div className="form-control">
        <label className="label font-semibold">Description</label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full"
          required
        />
      </div>

      {/* Parent Category */}
      <div className="form-control">
        <label className="label font-semibold">Parent Category</label>
        <select name="parent" className="select select-bordered w-full">
          <option value="">-- None (Top Level) --</option>
          {parentCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </div>
    </form>
  );
}
