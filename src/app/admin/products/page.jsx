import TabularProducts from "@/components/Products/TabularProducts";
import { getAllProducts } from "@/app/actions/products";

export default async function ProductsAdmin() {
  let products = { success: false, data: [] };
  
    try {
      products = await getAllProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  return (
    <section className="min-h-screen">
      <h1 className="text-xl md:text-3xl font-bold text-center my-6">
        All Products
      </h1>
      <div>
        <TabularProducts products={products.data} />
      </div>
    </section>
  );
}
