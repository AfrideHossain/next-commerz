"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllCategories } from "../actions/categoriesAction";
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
        {category.children?.length > 0 ? (
          <div className="collapse collapse-arrow bg-gray-700 rounded-md hover:bg-gray-600">
            <input type="checkbox" />
            <div className="collapse-title font-medium">{category.name}</div>
            <div className="collapse-content text-sm">
              <ul className="space-y-1">
                {category.children.map((child) => (
                  <li key={child._id}>
                    <Link
                      href={`/products/category/${child.name}`}
                      className="block px-4 py-2 rounded hover:bg-gray-600"
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
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
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 z-40 w-64 p-5 bg-gray-800 space-y-6 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } h-screen md:h-auto overflow-y-auto`}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Categories</h2>
        <nav className="space-y-3 pr-1">
          {!categories.length ? (
            <p className="text-sm text-gray-400">No categories found.</p>
          ) : (
            renderDropdownTree(categories)
          )}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 z-10">
        <div className="flex items-center justify-between mb-6">
          
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 bg-gray-700 rounded-md text-white"
            aria-label="Toggle categories"
          >
            <FaBars />
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
