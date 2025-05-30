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
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError("Check your credentials");
    }
  };
  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <Form className="space-y-4 w-full" onSubmit={handleLogin}>
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
        <div>
          <button type="submit" className="w-full btn btn-primary">
            Sign In
          </button>
        </div>
      </Form>
      <div>
        <p>
          <Link href="/forget-password" className="text-blue-500">
            Forgot my password
          </Link>
        </p>
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
