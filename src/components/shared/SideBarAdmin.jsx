"use client";

import { useState } from "react";

export default function SideBarAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
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
          {/* render children */}
          {children}
        </main>
      </div>
    </>
  );
}
