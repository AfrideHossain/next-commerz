"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getAllCategories,
  getAvailableCategories,
} from "../actions/categoriesAction";
import { FaBars } from "react-icons/fa";

export default function ProductsLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(JSON.parse(res.data));
      } else {
        console.log("Error from products layout: ", res.msg);
      }
    };
    fetchCategories();
  }, []);

  const renderDropdownTree = (categoryList) => {
    return categoryList.map((category) => (
      <div key={category._id}>
        {category.children && category.children.length > 0 ? (
          <div className="collapse collapse-plus bg-gray-700 rounded-md hover:bg-gray-600">
            <input type="radio" name={category.slug} />
            <div className="collapse-title font-medium"> {category.name}</div>
            <div className="collapse-content text-sm">
              <ul className="ml-4 space-y-1">
                {category.children.map((child) => (
                  <li key={child._id}>
                    <Link
                      href={`/products/category/${child.name}`}
                      className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          // <details className="mb-2 bg-gray-700 rounded-md">
          //   <summary className="cursor-pointer px-4 py-2 font-semibold hover:bg-gray-600">
          //     {category.name}
          //   </summary>
          //   <ul className="ml-4 p-2 space-y-1">
          //     {category.children.map((child) => (
          //       <li key={child._id}>
          //         <Link
          //           href={`/products/category/${child.name}`}
          //           className="block px-2 py-1 rounded hover:bg-gray-600"
          //         >
          //           {child.name}
          //         </Link>
          //       </li>
          //     ))}
          //   </ul>
          // </details>
          <Link
            href={`/products/category/${category.name}`}
            className="block px-4 py-2 mb-2 bg-gray-700 rounded-md hover:bg-gray-600"
          >
            {category.name}
          </Link>
        )}
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <div className="flex min-h-screen text-white">
        {/* Sidebar */}
        <aside
          className={`bg-gray-800 p-5 w-64 space-y-6 ${
            isSidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          <h2 className="text-2xl font-bold text-center">Categories</h2>
          <nav className="mt-6">
            {!categories.length ? (
              <p>No categories found.</p>
            ) : (
              renderDropdownTree(categories)
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 bg-gray-700 rounded-md"
            >
              <FaBars />
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
