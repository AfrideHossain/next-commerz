"use client";

import { add } from "@/lib/redux/features/cart/cartSlice";
import { makeStore } from "@/lib/redux/store";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export default function ProviderRedux({ children, initialCart }) {
  const storeRef = useRef(undefined);
  // create store if there is not any store configured
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  useEffect(() => {
    if (initialCart && storeRef.current) {
      storeRef.current.dispatch(add(initialCart));
    }
  }, [initialCart]);
  return <Provider store={storeRef.current}>{children}</Provider>;
}
