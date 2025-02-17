"use client";

import { useState } from "react";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaBars,
} from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 p-5 w-64 space-y-6 ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
        <nav className="mt-6 space-y-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md"
          >
            <FaBox /> Products
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md"
          >
            <FaShoppingCart /> Orders
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md"
          >
            <FaUsers /> Users
          </Link>
          <Link
            href="/admin/revenue"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md"
          >
            <FaDollarSign /> Revenue
          </Link>
          <button className="flex items-center gap-3 p-2 text-red-500 hover:bg-gray-700 rounded-md w-full">
            <IoIosLogOut /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 bg-gray-700 rounded-md"
          >
            <FaBars />
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <StatCard title="Total Products" value="1,234" icon={<FaBox />} />
          <StatCard
            title="Total Orders"
            value="567"
            icon={<FaShoppingCart />}
          />
          <StatCard title="Total Users" value="89" icon={<FaUsers />} />
          <StatCard title="Revenue" value="$45,678" icon={<FaDollarSign />} />
        </div>

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
      </main>
    </div>
  );
}

// Stat Card Component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-gray-800 p-6 rounded-lg flex items-center gap-4">
    <div className="text-yellow-400 text-3xl">{icon}</div>
    <div>
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);
