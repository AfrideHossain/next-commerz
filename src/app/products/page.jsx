import { getAllProducts } from "@/app/actions/products";
import { auth } from "@/auth";
import Products from "@/components/Products/Products";
import Skeleton from "@/components/shared/Loader/Skeleton";
import React, { Suspense } from "react";

export default async function ProductsAdmin() {
  let products = { success: false, data: [] };

  try {
    products = await getAllProducts();
    // console.log(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  const session = await auth();

  return (
    <section className="container mx-auto min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-6">All Products</h1>

      {products.success && products.data.length > 0 ? (
        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <Skeleton />
            </div>
          }
        >
          <Products products={products.data} user={session?.user} />
        </Suspense>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </section>
  );
}
