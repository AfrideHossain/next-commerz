"use client";

import { useEffect, useState } from "react";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaBars,
} from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { getLenProductsUsersOrders } from "../actions/adminActions";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [statsLen, setStatsLen] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });
  useEffect(() => {
    const getStatsLen = async () => {
      const statsObj = await getLenProductsUsersOrders();
      // console.log(statsObj);
      setStatsLen(statsObj);
    };
    getStatsLen();
  }, []);
  return (
    <>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <StatCard
          title="Total Products"
          value={statsLen.products}
          icon={<FaBox />}
        />
        <StatCard
          title="Total Orders"
          value={statsLen.orders}
          icon={<FaShoppingCart />}
        />
        <StatCard
          title="Total Users"
          value={statsLen.users}
          icon={<FaUsers />}
        />
        <StatCard title="Revenue" value="$45,678" icon={<FaDollarSign />} />
      </div>
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
