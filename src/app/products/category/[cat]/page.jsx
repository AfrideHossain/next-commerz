import { getProductsByCat } from "@/app/actions/products";
import Products from "@/components/Products/Products";

export default async function ProductBySlugPage({ params }) {
  const { cat } = await params;
  let products = [];
  try {
    const decodedCat = decodeURIComponent(cat);
    const getProductsRes = await getProductsByCat(decodedCat);
    if (getProductsRes.success) {
      console.log(getProductsRes.data);
      products = getProductsRes.data;
    } else {
      console.log(getProductsRes.message);
      // console.log("Error from products by slug page inside if");
    }
  } catch (error) {
    console.log("Error from product by slug: ", error);
  }
  return (
    <>
      {products.length > 0 ? (
        <Products products={products} />
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="text-3xl font-bold text-neutral">
            There is no products
          </h1>
        </div>
      )}
    </>
  );
}
