import { getAllProducts } from "@/app/actions/products";
import Products from "@/components/Products/Products";
import SearchBar from "@/components/search/SearchBar";

export default async function ProductsPage() {
  let products = { success: false, data: [] };

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <section>
      {/* <h1 className="text-xl md:text-3xl font-bold text-center my-6">
        All Products
      </h1> */}
      <SearchBar />
      {products.success && products.data.length > 0 ? (
        <Products products={products.data} />
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </section>
  );
}
