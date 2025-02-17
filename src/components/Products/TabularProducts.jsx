import Image from "next/image";
import Link from "next/link";

export default function TabularProducts({ products }) {
  return (
    <>
      {!products.length > 0 && "There is no products yet"}
      {products.length > 0 && (
        <div className="mt-10 bg-gray-800 p-6 rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full table border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2">Product ID</th>
                  <th className="py-2">Product Name</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="py-2">{product._id.toString()}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="relative mask mask-squircle h-12 w-12">
                            <Image
                              src={product.image}
                              fill
                              sizes="48px"
                              className="object-cover"
                              quality={100}
                              alt={product.name}
                            />
                          </div>
                        </div>
                        <div>
                          {/* Product Name */}
                          <div className="font-bold">{product.name}</div>
                          <span className="badge badge-ghost badge-sm">
                            Desktop Support Technician
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">{product.category}</td>
                    <td className="py-2 text-yellow-400">
                      {product.price} Tk /-
                    </td>
                    <td className="py-2">
                      <div className="join">
                        <Link
                          href={`/products/${product._id}`}
                          className="join-item btn btn-sm btn-outline btn-accent"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/products/edit/${product._id}`}
                          className="join-item btn btn-sm btn-outline btn-info"
                        >
                          Edit
                        </Link>
                        <button className="join-item btn btn-sm btn-outline btn-error">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
