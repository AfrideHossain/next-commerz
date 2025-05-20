"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaBars,
} from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

export default function AdminDashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 min-h-screen w-64 bg-gray-800 p-5 transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md"
          >
            <FaBox /> Products
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md"
          >
            <MdOutlineCategory /> Categories
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
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-10">
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center md:hidden">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-700 rounded-md"
          >
            <FaBars />
          </button>
        </header>

        <main className="container md:p-6">
          <div className="hidden md:flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
