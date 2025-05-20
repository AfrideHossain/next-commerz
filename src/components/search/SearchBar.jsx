"use client";

import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ className }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  return (
    <>
      <div className="py-6">
        <form onSubmit={handleSearch} className={cn(`flex gap-2`, className)}>
          <input
            type="text"
            placeholder="Search products"
            className="input input-bordered w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
