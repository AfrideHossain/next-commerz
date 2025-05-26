"use client";

import { registerUser } from "@/app/actions/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  // router to navigate to other pages
  const router = useRouter();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const data = Object.fromEntries(formData.entries());
    // console.log(data);
    // const response = await registerUser(data);
    const response = await registerUser(formData);
    console.log(response);
    if (response?.success) {
      console.log("User registered successfully");
      router.push("/login");
    }
  };
  return (
    <>
      <form
        className="space-y-4 w-full"
        encType="multipart/form-data"
        onSubmit={handleRegistration}
      >
        <div className="form-control w-full space-y-1">
          <label htmlFor="name" className="label text-sm">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full space-y-1">
          <label htmlFor="email" className="label text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            className="input input-bordered w-full focus:outline-none"
          />
        </div>
        <div className="form-control w-full space-y-1">
          <label htmlFor="password" className="label text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="off"
            className="input input-bordered w-full focus:outline-none"
          />
        </div>

        {/* file input */}
        <div className="form-control w-full space-y-1">
          <label htmlFor="dp_image" className="label text-sm">
            Display picture(DP)
          </label>
          <input
            type="file"
            name="dp_image"
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
        </div>
        <div>
          <button type="submit" className="w-full btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
      <div>
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login now!
          </Link>
        </p>
      </div>
    </>
  );
}
