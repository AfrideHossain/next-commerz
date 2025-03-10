import TabularProducts from "@/components/Products/TabularProducts";
import { getAllProducts } from "@/app/actions/products";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

export default async function ProductsAdmin() {
  let products = { success: false, data: [] };

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return (
    <section className="min-h-screen">
      <div>
        <TabularProducts products={products.data} />
      </div>
    </section>
  );
}
