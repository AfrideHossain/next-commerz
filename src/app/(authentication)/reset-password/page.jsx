"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaKey, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/app/actions/authentication";

export default function ResetPassPage() {
  const tokenParam = useSearchParams();
  const token = tokenParam.get("token");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [message, setMessage] = useState({});

  if (!token) {
    throw new Error("Missing password reset token.");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(token, password);
    if (!res.success) {
      setMessage({ success: false, msg: res.message });
    } else {
      setMessage({
        success: false,
        msg: res.message,
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold pb-5">Update password</h1>
      <form className="space-y-5 w-lg" onSubmit={handleSubmit}>
        <label className="input w-full input-info">
          <FaKey className="w-5 h-5" />
          <input
            type={isPassVisible ? "text" : "password"}
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setIsPassVisible((prev) => !prev)}
          >
            {isPassVisible ? (
              <FaEyeSlash className="w-5 h-5" />
            ) : (
              <FaEye className="w-5 h-5" />
            )}
          </button>
        </label>
        <div className="flex gap-4">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
          {/* <Link href={"/login"} className="btn btn-ghost btn-outline">
            Sign in
          </Link> */}
        </div>
        <p className={`!${message.success && "text-error"}`}>{message?.msg}</p>
      </form>
    </div>
  );
}
