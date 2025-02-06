"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function AddProduct() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen p-6">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl p-8 flex gap-8">
        {/* Image Upload and Preview */}
        <div className="flex flex-col items-center border-r border-gray-500 pr-4">
          <label className="label font-semibold">Upload Image</label>
          <div className="relative w-96 aspect-[4/3] border-0 mb-5 rounded-md overflow-hidden">
            {" "}
            {/* 16:9 Aspect Ratio */}
            <Image
              src={preview || "/assets/picture.png"}
              alt="Product Preview"
              fill
              objectFit="cover"
              className="absolute top-0 left-0 rounded-md"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full mb-4"
          />
        </div>

        {/* Form Section */}
        <div className="w-2/3">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Add Product
          </h1>
          <form encType="multipart/form-data" className="space-y-4">
            {/* Product Name */}
            <div className="form-control">
              <label className="label font-semibold">Product Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Product Category */}
            <div className="form-control">
              <label className="label font-semibold">Category</label>
              <select
                name="category"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Category</option>
                <option value="cookies">Cookies</option>
                <option value="brownies">Brownies</option>
                <option value="cakes">Cakes</option>
              </select>
            </div>

            {/* Price, Stock, and Discount Price */}
            <div className="grid grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label font-semibold">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  className="input input-bordered w-full"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="input input-bordered w-full"
                  placeholder="Enter stock quantity"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">
                  Discount Price ($)
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  className="input input-bordered w-full"
                  placeholder="Enter discount price"
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label font-semibold">Description</label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                placeholder="Enter product description"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary w-full">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
