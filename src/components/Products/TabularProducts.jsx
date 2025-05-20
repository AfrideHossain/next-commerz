import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";
import { LuPlus } from "react-icons/lu";

export default function TabularProducts({ products }) {
  const hasProducts = products && products.length > 0;

  return (
    <div className="w-full">
      {!hasProducts && (
        <div className="h-[60vh] flex items-center justify-center text-center text-lg text-gray-400">
          No products found.
        </div>
      )}

      {hasProducts && (
        <div className="mt-10 bg-gray-800 p-4 md:p-6 rounded-lg">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold text-white">All Products</h2>
            <Link
              href="/admin/products/add"
              className="btn btn-outline rounded-full flex items-center gap-2"
            >
              <LuPlus className="text-lg" />
              Add New Product
            </Link>
          </div>

          {/* Table View for Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Product</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Stock</th>
                  {/* <th className="p-2">Status</th> */}
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id.toString()}
                    className="border-t border-gray-700"
                  >
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.category || "—"}</td>
                    <td className="p-2 text-yellow-400">
                      {product.price} Taka
                    </td>
                    <td className="p-2">{product.stock}</td>
                    {/* <td className="p-2">
                      <span
                        className={`badge text-xs uppercase ${
                          product.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td> */}
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product._id}`}
                          className="btn btn-xs sm:btn-sm btn-ghost text-success"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/products/edit/${product._id}`}
                          className="btn btn-xs sm:btn-sm btn-ghost text-info"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton
                          classname="btn btn-xs sm:btn-sm btn-ghost text-error"
                          productId={product._id.toString()}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View for Mobile */}
          <div className="block md:hidden space-y-4">
            {products.map((product) => (
              <div
                key={product._id.toString()}
                className="bg-gray-700 rounded-lg p-4 text-white shadow"
              >
                <p className="text-sm text-gray-400 break-all">
                  ID:{" "}
                  <span className="text-white">{product._id.toString()}</span>
                </p>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm">Category: {product.category || "—"}</p>
                <p className="text-sm">Price: {product.price} Taka</p>
                <p className="text-sm">Stock: {product.stock}</p>
                {/* <p className="text-sm mt-1">
                  <span
                    className={`badge text-xs uppercase ${
                      product.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {product.status}
                  </span>
                </p> */}
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/products/${product._id}`}
                    className="btn btn-xs sm:btn-sm btn-ghost text-success"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/products/edit/${product._id}`}
                    className="btn btn-xs btn-ghost text-info"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton
                    classname={"btn btn-xs btn-ghost text-error"}
                    productId={product._id.toString()}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
