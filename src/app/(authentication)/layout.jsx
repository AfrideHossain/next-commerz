import React from "react";

export default function layout({ children }) {
  return (
    <main className="container mx-auto min-h-screen flex justify-center items-center">
      <section className="w-full md:w-auto p-4">{children}</section>
    </main>
  );
}
