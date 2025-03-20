"use client";

import { logoutUser } from "@/app/actions/authentication";
import { clear } from "@/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/redux/hooks/reduxHooks";
import { cn } from "@/utils/cn";

export default function LogoutBtn({ className }) {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(clear());
    await logoutUser();
  };
  return (
    <button
      onClick={handleLogout}
      // className="py-2 px-8 font-semibold text-white bg-blue-600 rounded-sm"
      className={cn(className)}
    >
      Logout
    </button>
  );
}
