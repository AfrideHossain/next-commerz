"use client";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import UserPanelMenu from "@/components/Users/UserPanelMenu";

export default function MyProfileLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:relative top-0 left-0 z-40 w-64 p-5 bg-gray-800 space-y-6 transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          } h-screen md:h-auto overflow-y-auto`}
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            User Dashboard
          </h2>
          <nav className="space-y-3 pr-1">
            <UserPanelMenu />
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
        <main className="flex-1 md:p-6 z-10">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden m-2 p-2 bg-gray-700 rounded-md text-white"
              aria-label="Toggle categories"
            >
              <FaBars />
            </button>
          </div>
          <div className="container min-h-screen mx-auto">{children}</div>
        </main>
      </div>
    </>
  );
}
