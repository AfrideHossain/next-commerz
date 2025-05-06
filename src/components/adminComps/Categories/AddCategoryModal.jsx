import AddCategoryForm from "./AddCategoryForm";

export default function AddCategoryModal() {
  return (
    <dialog
      id="add_category_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            id="add_category_modal_close"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Register New Category</h3>
        <div className="py-4">
          <AddCategoryForm />
        </div>
      </div>
    </dialog>
  );
}
