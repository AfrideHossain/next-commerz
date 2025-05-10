import { getAllProducts } from "@/app/actions/products";
import Products from "../Products/Products";

export default async function HomeProducts() {
  let products = { success: false, data: [] };

  try {
    products = await getAllProducts(6);

    console.log("All products from homepage: ", products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return (
    <>
      <Products products={products.data} />
    </>
  );
}
