"use client";

import { useState, useEffect, useMemo } from "react";
import { getCart, updateCart, removeFromCart } from "@/app/actions/cartActions";
import { useSession } from "next-auth/react";
import Loader from "@/components/shared/Loader/Loader";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/redux/hooks/reduxHooks";
import { removeItem, updateItem } from "@/lib/redux/features/cart/cartSlice";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  // const userEmail = session?.user?.email;
  const userEmail = useMemo(() => session?.user?.email, [status]);

  // dispatch from redux toolkit
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    if (!userEmail) {
      setLoading(false);
      return; //navigate to the home
    }

    getCart(userEmail)
      .then((res) => {
        if (res.success) {
          console.log(res);
          setCart((prev) =>
            JSON.stringify(prev) !== JSON.stringify(res.cart) ? res.cart : prev
          );
        }
      })
      .catch((error) => console.error("Error fetching cart:", error))
      .finally(() => setLoading(false));
  }, [userEmail]); // Depend only on `userEmail`

  // Async function for handling product's quantity update
  async function handleUpdate(productId, newQuantity) {
    if (newQuantity < 1) return;
    setLoading(true);
    try {
      const res = await updateCart({
        userEmail,
        productId,
        quantity: newQuantity,
      });
      if (res.success) {
        dispatch(updateItem({ productId, quantity: newQuantity }));
        setCart((prev) =>
          prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        toast.success("Cart Updated");
      } else {
        toast.error("Cart not updated");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(productId) {
    setLoading(true);
    // await removeFromCart({ userEmail, productId });
    // setCart((prev) => prev.filter((item) => item.productId !== productId));
    // setLoading(false);
    try {
      const res = await removeFromCart({ userEmail, productId });
      if (res.success) {
        dispatch(removeItem({ productId }));
        setCart((prev) => prev.filter((item) => item.productId !== productId));
        toast.success("Product removed from cart");
      } else {
        toast.error("Unable to remove product from cart");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // async function handleCheckout() {
  //   setLoading(true);
  //   await clearCart(userEmail);
  //   setCart([]);
  //   setLoading(false);
  //   alert("Checkout successful! 🎉");
  // }
  // TODO: Checkout functionality here...

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (!userEmail) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl font-medium text-center text-red-500">
          Please log in to view cart.
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold text-center text-gray-500">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Your Cart 🛒</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.productId}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-400">Price: ${item.price}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() =>
                    handleUpdate(item.productId, item.quantity - 1)
                  }
                  className="bg-gray-700 text-white px-2 py-1 rounded"
                  disabled={loading}
                >
                  -
                </button>
                <span className="text-white">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleUpdate(item.productId, item.quantity + 1)
                  }
                  className="bg-gray-700 text-white px-2 py-1 rounded"
                  disabled={loading}
                >
                  +
                </button>
              </div>
              <p className="text-sm font-bold text-white mt-1">
                Total: ${item.price * item.quantity}
              </p>
            </div>
            <button
              onClick={() => handleRemove(item.productId)}
              className="btn btn-error"
              disabled={loading}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <Link
        href={"/checkout"}
        // onClick={handleCheckout}
        className="btn btn-primary w-full mt-4"
        disabled={loading}
      >
        {loading ? "Processing..." : "Checkout"}
      </Link>
    </div>
  );
}
