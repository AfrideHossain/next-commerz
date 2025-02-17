"use client";

import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";

export default function GotoProductEdit({ id }) {
  const router = useRouter();
  const handleOnclick = () => {
    console.log("Clicked from: ", id);
    router.replace(`/admin/products/edit/${id}`);
  };
  //   href={`/admin/products/edit/${id}`}
  return (
    <button
      onClick={handleOnclick}
      className="btn btn-sm bg-sky-500 hover:bg-sky-700 text-white rounded-md flex items-center gap-2"
    >
      <FaEdit /> Edit
    </button>
  );
}
