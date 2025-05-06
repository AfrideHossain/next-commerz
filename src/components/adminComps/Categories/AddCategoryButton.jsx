"use client";
import { LuPlus } from "react-icons/lu";

export default function AddCategoryButton() {
  return (
    <button
      onClick={() => document.getElementById("add_category_modal").showModal()}
      className="btn btn-ghost btn-outline rounded-full "
    >
      <LuPlus className="text-xl" />
      Register new Category
    </button>
  );
}
