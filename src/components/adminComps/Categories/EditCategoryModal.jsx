import EditCategoryForm from "./EditCategoryForm";

export default function EditCategoryModal({ categoryString }) {
  const category = JSON.parse(categoryString);
  return (
    <dialog
      id={`edit_category_modal${category._id}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            id={`edit_category_modal${category._id}_close`}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Modify Category</h3>
        <div className="py-4">
          <EditCategoryForm categoryString={JSON.stringify(category)} />
        </div>
      </div>
    </dialog>
  );
}
