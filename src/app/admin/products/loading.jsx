import Loader from "@/components/shared/Loader/Loader";
import React from "react";

export default function loading() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  );
}
