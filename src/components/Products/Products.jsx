import Product from "./Product";
export default function Products({ products, user }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
      {products.map((product) => (
        <div key={product._id}>
          <Product product={product} user={user} />
        </div>
      ))}
    </div>
  );
}
