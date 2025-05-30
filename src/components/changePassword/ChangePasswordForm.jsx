"use client";

import { changePassword } from "@/app/actions/authentication";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ChangePasswordForm() {
  const [error, setError] = useState("");

  // on submit handler
  const handleSubmit = async (event) => {
    // prevent default behave
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const new_pass = formData.get("new_pass");
    const confirm_new_pass = formData.get("confirm_new_pass");
    // console.log({ new_pass, confirm_new_pass });
    if (new_pass !== confirm_new_pass) {
      console.log("Password and confirm password mismatched");
      setError("New password and confirmation do not match.");
      return;
    } else {
      setError(""); // clear any existing errors
    }

    try {
      const result = await changePassword(formData);

      if (!result.success) {
        setError(result.message);
      } else {
        setError("");
        toast.success(result.message); // or show a message
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="md:w-xl w-full space-y-4">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Change Current Password
      </h1>
      <div className="form-control w-full space-y-1">
        <label htmlFor="current_pass" className="label text-sm">
          Current Password
        </label>
        <input
          id="current_pass"
          type="password"
          name="current_pass"
          autoComplete="off"
          className="input input-bordered w-full focus:outline-none"
        />
      </div>
      <div className="form-control w-full space-y-1">
        <label htmlFor="new_pass" className="label text-sm">
          New Password
        </label>
        <input
          id="new_pass"
          type="password"
          name="new_pass"
          autoComplete="off"
          className="input input-bordered w-full focus:outline-none"
        />
      </div>
      <div className="form-control w-full space-y-1">
        <label htmlFor="confirm_new_pass" className="label text-sm">
          Confirm New Password
        </label>
        <input
          id="confirm_new_pass"
          type="password"
          name="confirm_new_pass"
          autoComplete="off"
          className="input input-bordered w-full focus:outline-none"
        />
      </div>
      {error.length > 0 && (
        <div>
          <p className="label text-error text-sm">{error}</p>
        </div>
      )}
      <div>
        <button type="submit" className="w-full btn btn-primary">
          Proceed
        </button>
      </div>
    </form>
  );
}
