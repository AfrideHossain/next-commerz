import { getAProduct } from "@/app/actions/products";
import { auth } from "@/auth";
import AddToCartBtn from "@/components/Products/AddToCartBtn";
import Image from "next/image";
import { BsStarFill, BsCartPlus, BsTruck, BsCreditCard } from "react-icons/bs";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getAverageRating,
  getRatingsForProduct,
} from "@/app/actions/ratingActions";
import RatingForm from "@/components/Products/RatingForm";

export default async function SingleProduct({ params }) {
  // get the session
  const session = await auth();
  const { id } = await params;
  let product = {};
  const productRes = await getAProduct(id);
  // Console logging the product obj for debugging purpose only.
  // console.log(product);

  if (!productRes.success) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl text-red-500">Product not found!</h1>
      </section>
    );
  } else {
    product = { ...productRes.data };
    // console.log(product);
  }

  //Product rating
  const avgRatingRes = await getAverageRating(product?._id?.toString() || id);
  const avgRating = avgRatingRes.success ? avgRatingRes.data : 0;
  console.log({avgRatingRes})

  return (
    <section className="min-h-screen flex items-center justify-center py-10 px-5 text-white">
      <div className="max-w-6xl w-full rounded-lg md:p-10 flex flex-col md:flex-row gap-8">
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
          <div className="flex items-center mt-2 gap-2 text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <BsStarFill
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(avgRating)
                    ? "text-yellow-400"
                    : "text-gray-500"
                }`}
              />
            ))}
            <span className="text-sm text-gray-300">
              ({avgRating.toFixed(1)} stars)
            </span>
          </div>

          {/* Price & Discount */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-4">
            <span className="text-3xl flex gap-2 font-bold text-blue-400">
              <FaBangladeshiTakaSign /> {product.discountPrice || product.price}
            </span>
            {product.discountPrice > 0 && (
              <>
                <span className="text-lg line-through text-gray-500">
                  {product.price} Taka
                </span>

                <span className="text-green-400 text-sm">
                  Save {product.price - product.discountPrice} Taka
                </span>
              </>
            )}
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
          <div className="flex md:justify-end gap-4 mt-6">
            <AddToCartBtn
              // productId={`${product._id}`}
              product={JSON.stringify(product)}
              userEmail={session?.user?.email || ""}
            />
            {/* <button className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300">
              Buy Now
            </button> */}
          </div>

          <div className="space-y-3 mt-6">
            <p className="text-3xl border-b border-gray-400 py-2 font-semibold">
              Product Description
            </p>
            <div className="text-gray-400 prose">
              {/* <Markdown ></Markdown> */}
              <Markdown remarkPlugins={remarkGfm}>
                {product.description}
              </Markdown>
            </div>
          </div>
          {/* Rating form */}
          <RatingForm productId={id} userEmail={session?.user?.email || ""} />
        </div>
      </div>
    </section>
  );
}
