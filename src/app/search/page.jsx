"use client";

import SearchBar from "@/components/search/SearchBar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductsBySearch } from "../actions/searchAction";
import Products from "@/components/Products/Products";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProductsBySearch(query);
      if (res) {
        setProducts(JSON.parse(res));
      }
    };

    fetchProducts();
  }, [query]);
  return (
    <section className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center">
        Search from all products
      </h1>
      <SearchBar />
      <h2 className="text-xl font-bold mb-4 text-center">
        Search Results for: "{query}"
      </h2>
      <>
        <Products products={products} />
      </>
    </section>
  );
}
