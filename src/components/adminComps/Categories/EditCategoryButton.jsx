"use client";

import EditCategoryModal from "./EditCategoryModal";

export default function EditCategoryButton({ categoryString }) {
  const category = JSON.parse(categoryString);
  return (
    <>
      <button
        onClick={() =>
          document
            .getElementById(`edit_category_modal${category._id}`)
            .showModal()
        }
        className="btn btn-sm btn-ghost text-warning join-item"
      >
        Edit
      </button>
      <EditCategoryModal categoryString={JSON.stringify(category)} />
    </>
  );
}
