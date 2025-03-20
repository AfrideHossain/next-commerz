"use client";

import { useState, useCallback } from "react";
import { addToCart } from "@/app/actions/cartActions";
import { BsCartPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/redux/hooks/reduxHooks";
import { add } from "@/lib/redux/features/cart/cartSlice";

export default function AddToCartBtn({ product, userEmail }) {
  const [loading, setLoading] = useState(false);
  const parsedProduct = JSON.parse([product]);
  // the redux dispatch from hooks
  const dispatch = useAppDispatch();

  // const handleAddToCart = useCallback(async () => {
  //   if (loading) return; // Prevent multiple clicks

  //   setLoading(true);

  //   try {
  //     const res = await addToCart({ userEmail, productId, quantity: 1 });

  //     if (res.success) {
  //       toast.success("Item added to cart! 🛒");
  //     } else {
  //       toast.error(res.message || "Failed to add item.");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [userEmail, productId, loading]);
  const handleAddToCart = async () => {
    // return is loading state is true
    if (loading) return;

    // set the loading state as true;
    setLoading(true);

    try {
      // call the addToCart Server action and wait
      const res = await addToCart({
        userEmail,
        productId: parsedProduct._id.toString(),
        quantity: 1,
      });

      if (res.success) {
        dispatch(
          add({
            productId: parsedProduct._id,
            name: parsedProduct.name,
            price: parsedProduct.price,
            quantity: 1,
          })
        );
        toast.success("Item added to cart! 🛒");
      } else {
        toast.error(res.message || "Failed to add item.");
      }
    } catch (error) {
      // catch the error
      console.log("Error from add to cart button component: ", error);
    } finally {
      // finally set loading state as false
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="btn btn-primary flex items-center gap-2"
    >
      <BsCartPlus className="w-5 h-5" />
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
