"use client";

import { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";

export default function ProductCTABlock({ product, userEmail }) {
  const [size, setSize] = useState("");
  const productInfo = JSON.parse(product);
  const handleSizeChange = async (event) => {
    // console.log(event.target.value);
    setSize(event.target.value.toUpperCase());
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <div className="flex gap-2 items-center">
        {/* <p className="text-sm">Size: </p> */}
        <input
          className="input focus:outline-none"
          name="size"
          value={size}
          placeholder="Enter desired size"
          onChange={handleSizeChange}
        />
      </div>
      <AddToCartBtn
        // productId={`${product._id}`}
        product={JSON.stringify(productInfo)}
        userEmail={userEmail}
        size={size}
      />
      {/* <button className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300">
              Buy Now
            </button> */}
    </div>
  );
}
