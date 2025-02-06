import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="p-8 border border-gray-500 rounded-md space-y-2">
        <h1 className="text-4xl font-bold">Home</h1>
        <p className="text-2xl font-semibold">Welcome to the home page.</p>
        <Link className="text-blue-500 font-medium underline" href={"/login"}>Go To Login</Link>
      </div>
    </div>
  );
}
