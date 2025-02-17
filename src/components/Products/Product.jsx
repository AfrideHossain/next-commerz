import Image from "next/image";
import Link from "next/link";
import { FaTags, } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export default function Product({ product }) {

  return (
    <Link
      href={`/products/${product._id}`}
      className="card card-compact bg-base-100 shadow-xl rounded-lg md:rounded-2xl transition-transform transform hover:scale-105"
    >
      {/* Product Image */}
      <figure className="relative h-24 md:h-44">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="rounded-t-lg object-cover"
          sizes="(max-width: 768px) 80vw, 40vw"
        />
      </figure>

      {/* Product Details */}
      <div className="card-body">
        <h2 className="card-title text-sm font-semibold">{product.name}</h2>

        {/* Category & Price */}
        <div className="flex flex-col md:flex-row justify-between text-sm text-gray-500 mt-2">
          <span className="flex items-center gap-2">
            <FaTags className="text-xs text-blue-400" />
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-green-500 font-medium">
            <FaBangladeshiTakaSign className="text-lg" />
            {product.price} Tk
          </span>
        </div>
      </div>
    </Link>
  );
}
