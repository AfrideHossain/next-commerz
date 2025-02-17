import { getAllProducts } from "@/app/actions/products";
import Products from "@/components/Products/Products";

export default async function ProductsPage() {
  let products = { success: false, data: [] };

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <section className="container mx-auto min-h-screen">
      <h1 className="text-xl md:text-3xl font-bold text-center my-6">All Products</h1>

      {products.success && products.data.length > 0 ? (
        <Products products={products.data}/>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </section>
  );
}
