import React from "react";

export default function layout({ children }) {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <section>{children}</section>
    </main>
  );
}
