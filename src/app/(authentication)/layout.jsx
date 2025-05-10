import React from "react";

export default function layout({ children }) {
  return (
    <main className="container mx-auto px-4 min-h-screen flex justify-center items-center">
      <section>{children}</section>
    </main>
  );
}
