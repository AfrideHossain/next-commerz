import React from "react";

export default function StatCard({ title, value, icon }) {
  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg flex items-center gap-4">
        <div className="text-yellow-400 text-3xl">{icon}</div>
        <div>
          <h3 className="text-gray-400 text-sm">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </>
  );
}
