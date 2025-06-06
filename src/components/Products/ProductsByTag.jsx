import { getProductsByTag } from "@/app/actions/products";
import Product from "./Product";

export default async function ProductsByTag({ tagname }) {
  let products = [];

  const res = await getProductsByTag(tagname);
  console.log("Response from: ", res);

  if (res.success) {
    products = res.data;
  }
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {products?.map((product) => (
          <div key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
