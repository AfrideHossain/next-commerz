"use client";

// import icon
import { BsInfoCircle } from "react-icons/bs";
export default function TextAreaInfoModalBtn() {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-ghost btn-sm btn-circle text-base"
        onClick={() => document.getElementById("textAreaInfoModal").showModal()}
      >
        <BsInfoCircle />
      </button>
    </>
  );
}
