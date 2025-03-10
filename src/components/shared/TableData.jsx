// temporary component may delete later.

export default function TableData() {
  return (
    <>
      {/* Recent Orders */}
      <div className="mt-10 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="py-2">#1234</td>
              <td className="py-2">John Doe</td>
              <td className="py-2">$120</td>
              <td className="py-2 text-green-400">Shipped</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-2">#1235</td>
              <td className="py-2">Jane Smith</td>
              <td className="py-2">$250</td>
              <td className="py-2 text-yellow-400">Pending</td>
            </tr>
            <tr>
              <td className="py-2">#1236</td>
              <td className="py-2">Mike Johnson</td>
              <td className="py-2">$75</td>
              <td className="py-2 text-red-400">Cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
