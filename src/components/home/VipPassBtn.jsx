"use client";

import { claimVipPass } from "@/app/actions/vipPassAction";
import { redirect } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function VipPassBtn({ userId }) {
  const [loading, setLoading] = useState(false);
  const handleClaimVipPass = async () => {
    setLoading(true);
    try {
      const res = await claimVipPass(userId);
      if (res.success) {
        Swal.fire({
          title: "Congratulations!",
          text: "Now, you are a VIP customer. So, from now on, you are our priority",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else if (res.error === "notLoggedIn") {
        Swal.fire({
          title: "Please sign in!",
          text: `We know you're as excited as we are. So, quickly sign in/sign up and become a VIP customer. We are looking forward to welcoming you. Don't miss it.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#00c951",
          cancelButtonColor: "#e7000b",
          reverseButtons: true,
          confirmButtonText: "Login Now!",
        }).then((result) => {
          if (result.isConfirmed) {
            redirect("/login");
          }
        });
      } else {
        Swal.fire({
          title: "Oops!",
          text: `${res.message}`,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      throw new Error("Unable to claim vip pass right now!");
    }
  };
  return (
    <>
      <button
        onClick={handleClaimVipPass}
        className="btn btn-wide bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer"
      >
        Claim Your Pass Now!
      </button>
    </>
  );
}
