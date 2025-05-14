"use client";

import { sendResetRequest } from "@/app/actions/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";

export default function ForgetPassPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await sendResetRequest(email);
    if (!res.success) {
      setMessage({ success: false, msg: res.message });
    } else {
      setMessage({
        success: false,
        msg: "We have sent your password reset link. Please check your email.",
      });
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold pb-5">Forget password</h1>
      <form className="space-y-5 w-lg" onSubmit={handleSubmit}>
        <label className="input w-full input-info">
          <FaEnvelope className="w-5 h-5" />
          <input
            type="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </label>
        <div className="flex gap-4">
          <button className="btn btn-primary" type="submit">
            Send mail
          </button>
          <Link href={"/login"} className="btn btn-ghost btn-outline">
            Sign in
          </Link>
        </div>
        <p className={`!${message.success && "text-error"}`}>{message.msg}</p>
      </form>
    </div>
  );
}
