"use client";

import React from "react";
import Swal from "sweetalert2";
import { deleteAProduct } from "@/app/actions/products";

export default function DeleteProductButton({ productId }) {
  // const {productId} = React.use(params)
  // handle delete button
  const handleDeleteOperation = async () => {
    console.log("I am from function handleDeleteOperation", productId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteRes = await deleteAProduct(productId);
          if (deleteRes) {
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Oops!",
            text: "Unable to delete your product",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <>
      <button
        onClick={handleDeleteOperation}
        className="join-item btn btn-sm btn-outline btn-ghost"
      >
        Delete
      </button>
    </>
  );
}
