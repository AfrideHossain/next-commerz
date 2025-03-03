"use client";

import Link from "next/link";

export default function ErrorElement({ error, reset }) {
  return (
    <>
          <div className="min-h-screen text-white flex flex-col justify-center items-center relative overflow-hidden">
            <div className="text-center z-10">
              <div className="text-6xl font-extrabold mb-4 text-white glitch-static">
                Oops!
              </div>
              <div className="text-3xl font-semibold mb-6 text-indigo-300">
                {error.message}
              </div>
              <Link href="/" className="btn rounded-full btn-info">
                Return to Reality
              </Link>
            </div>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-purple-800 to-indigo-800 rounded-full blur-3xl opacity-30" />
              <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-l from-blue-800 to-cyan-800 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
    </>
  );
}
