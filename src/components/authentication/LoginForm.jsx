"use client";
import { credentialLogin } from "@/app/actions/authentication";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  // router
  const router = useRouter();
  // error state
  const [error, setError] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const credentials = new FormData(event.currentTarget);
      const data = Object.fromEntries(credentials.entries());
      // console.log(data);
      const response = await credentialLogin(data);

      if (!!response.error) {
        console.log(response.error);
        setError(response.error.message);
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
      setError("Check your credentials");
    }
  };
  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <Form className="space-y-4 w-96" onSubmit={handleLogin}>
        <div className="form-control w-full">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="off"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold rounded-md p-2"
          >
            Login
          </button>
        </div>
      </Form>
      <div>
        <p>
          Don't have an account?{" "}
          <Link href="/registration" className="text-blue-500">
            Register now!
          </Link>
        </p>
      </div>
    </>
  );
}
