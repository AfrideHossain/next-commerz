"use client";

import React from "react";
import Swal from "sweetalert2";

export default function DeleteProductButton({ productId }) {
    // const {productId} = React.use(params)
  // handle delete button
    const handleDeleteOperation = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    console.log("I am from deletebutton component", productId);
  };
  return (
    <>
      <button onClick={handleDeleteOperation} className="join-item btn btn-sm btn-outline btn-ghost">
        Delete
      </button>
    </>
  );
}
