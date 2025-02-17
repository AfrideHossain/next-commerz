import { getAProduct } from "@/app/actions/products";
import Image from "next/image";
import { BsStarFill, BsCartPlus, BsTruck, BsCreditCard } from "react-icons/bs";

export default async function SingleProduct({ params }) {
  const { id } = await params;
  const product = await getAProduct(id);
  console.log(product);

  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl text-red-500">Product not found!</h1>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-10 px-5 text-white">
      <div className="max-w-6xl w-full rounded-lg shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Left Side - Product Images */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
          <div className="flex gap-2 mt-4">
            {[product.image, product.image, product.image].map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt="Thumbnail"
                width={80}
                height={80}
                className="rounded-md border cursor-pointer hover:border-yellow-500"
              />
            ))}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-400 text-sm mt-1">{product.category}</p>

          {/* Ratings */}
          {/* <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <BsStarFill key={i} className="text-yellow-400 w-5 h-5" />
            ))}
            <span className="ml-2 text-gray-300 text-sm">(120 reviews)</span>
          </div> */}

          {/* Price & Discount */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-blue-400">
              ${product.discountPrice}
            </span>
            {product.discountPrice !== product.price && (
              <span className="text-lg line-through text-gray-500">
                ${product.price}
              </span>
            )}
            <span className="text-green-400 text-sm">
              Save ${product.price - product.discountPrice}
            </span>
          </div>

          {/* Stock Info */}
          <p
            className={`mt-2 text-sm ${
              product.stock > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>

          {/* Shipping */}
          {/* <div className="flex items-center gap-2 mt-3 text-sm text-gray-300">
            <BsTruck className="w-5 h-5 text-yellow-400" />
            <span>Free Shipping Available</span>
          </div> */}

          {/* Payment Options */}
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-300">
            <BsCreditCard className="w-5 h-5 text-blue-400" />
            <span>Cash on Delivery</span>
          </div>

          {/* Quantity Selector */}
          {/* <div className="flex items-center mt-4">
            <span className="text-gray-300">Quantity:</span>
            <input
              type="number"
              defaultValue={1}
              min={1}
              max={product.stock}
              className="ml-2 w-16 text-center bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-yellow-500"
            />
          </div> */}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button className="btn btn-primary">
              <BsCartPlus className="w-5 h-5" />
              Add to Cart
            </button>
            {/* <button className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300">
              Buy Now
            </button> */}
          </div>
          <div className="space-y-2 mt-6">
            <p className="text-lg font-semibold">Product Description</p>
            <p className="text-sm text-gray-400">{product.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
