"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast, Zoom } from "react-toastify";
import Loader from "@/components/shared/Loader/Loader";
import { editAProduct, getAProduct } from "@/app/actions/products";

export default function EditProduct({ params }) {
  const { id : productId } = React.use(params);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [productInfo, setProductInfo] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    discountPrice: "",
    description: "",
    image: "",
  });

  // Fetch product information from server
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productResponse = await getAProduct(productId);
        if (productResponse) {
          setProductInfo(productResponse);
          setPreview(productResponse.image);
        }
      } catch (error) {
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024;
    if (file) {
      if (file.size > maxSize) {
        toast.error("File size exceeds 2MB!");
        return;
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target);
      formData.append("id", productId); // Ensure ID is sent

      const response = await editAProduct(formData);
      if (response.success) {
        toast.success(`${response.message}`, { transition: Zoom });
      } else {
        toast.error(`${response.message}`);
      }
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex items-center min-h-screen p-6">
      {/* Loading Component */}
      {loading && (
        <div className="absolute top-0 left-0 z-50 w-full min-h-screen bg-slate-950/50 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <div className="bg-gray-900 rounded-lg shadow-lg w-full p-8 grid grid-cols-2 gap-8">
        {/* Image Upload and Preview */}
        <div className="flex flex-col justify-center items-center gap-6 border-r border-gray-500 pr-8">
          <p className="text-xl font-semibold">Preview Image</p>
          <div className="relative w-full h-full border-0 mb-5 rounded-md">
            <Image
              src={preview || "/assets/picture.png"}
              alt="Product Preview"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-md"
            />
          </div>
        </div>

        {/* Form Section */}
        <div>
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Edit {productInfo.name}
          </h1>
          <form
            onSubmit={onSubmitHandler}
            encType="multipart/form-data"
            className="space-y-4"
          >
            {/* Product Name */}
            <div className="form-control">
              <label className="label font-semibold">Product Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Enter product name"
                defaultValue={productInfo.name}
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
                defaultValue={productInfo.category}
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
                <label className="label font-semibold">Price (Tk/-)</label>
                <input
                  type="number"
                  name="price"
                  className="input input-bordered w-full"
                  placeholder="Enter price"
                  defaultValue={productInfo.price}
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
                  defaultValue={productInfo.stock}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">
                  Discount Price (Tk/-)
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  className="input input-bordered w-full"
                  placeholder="Enter discount price"
                  defaultValue={productInfo.discountPrice}
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
                defaultValue={productInfo.description}
                required
              />
            </div>

            {/* Upload Image */}
            <div className="form-control">
              <label className="label font-semibold">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                name="productImage"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full mb-4"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary w-full">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
