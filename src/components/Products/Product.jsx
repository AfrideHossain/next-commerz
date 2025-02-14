import Image from "next/image";
import { FaTags, FaEdit } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Link from "next/link";
export default function Product({ product, user }) {
  return (
    <Link href={`/products/${product?._id}`} className="card card-compact md:rounded-2xl rounded-lg bg-base-100 shadow-xl">
      {/* Product Image */}
      <figure className="relative h-24 md:h-44">
        <Image
          src={product?.image}
          alt={product?.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-lg"
          sizes="(max-width: 768px) 80vw, 40vw"
        />
      </figure>

      {/* Product Details */}
      <div className="card-body">
        <h2 className="card-title text-sm">{product?.name}</h2>

        {/* Product Category & Price */}
        <div className="flex flex-col md:flex-row gap-2 md:justify-between md:items-center mt-3 text-sm">
          <span className="flex items-center gap-2 text-gray-400">
            <FaTags className="text-xs text-blue-400" />
            {product?.category}
          </span>
          <span className="flex items-center gap-1">
            <FaBangladeshiTakaSign className="text-lg text-green-500" />
            {product?.price} Tk
          </span>
        </div>

        {/* Buy Button */}
        {/* <div className="card-actions justify-end mt-auto">
          {user?.role === "admin" && (
            <button className="w-full btn btn-sm bg-sky-500 hover:bg-sky-700 text-white rounded-md flex items-center gap-2">
              <FaEdit /> Edit
            </button>
          )}
          <button className="w-full btn btn-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2">
            <FaShoppingCart className="hidden md:block" /> Add to cart
          </button>
        </div> */}
      </div>
    </Link>
  );
}
