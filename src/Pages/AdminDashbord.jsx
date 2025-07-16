import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";

const pieData = [
  { name: "Completed", value: 75 },
  { name: "Incomplete", value: 25 },
];

const COLORS = ["#ec4899", "#f9a8d4"]; // pink shades

const barData = [
  { name: "User Invites", value: 12 },
  { name: "Vendor Requests", value: 5 },
  { name: "Events", value: 8 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-pink-50 text-gray-800 dark:bg-gray-900 dark:text-white transition">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-8">Wedding Admin</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-pink-600 font-semibold">Dashboard</a>
          <a href="#" className="block hover:text-pink-500">Users</a>
          <a href="#" className="block hover:text-pink-500">Vendors</a>
          <a href="#" className="block hover:text-pink-500">Weddings</a>
          <a href="#" className="block hover:text-pink-500">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-600">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-pink-500 px-3 py-2 rounded-full text-white text-sm"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("role");
                navigate("/login");
              }}
              className="text-sm text-pink-600 underline"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => setShowVendorModal(true)} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
            + Add Vendor
          </button>
          <button onClick={() => setShowUserModal(true)} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
            + Add User
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Users", value: 120 },
            { label: "Vendors", value: 35 },
            { label: "Weddings Planned", value: 47 },
            { label: "Pending Requests", value: 8 },
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <h3 className="text-sm text-gray-500 dark:text-gray-300">{card.label}</h3>
              <p className="text-3xl font-bold text-pink-600 mt-2">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-pink-600 mb-4">Task Completion</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-pink-600 mb-4">Overview Stats</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ec4899" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showVendorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold text-pink-600 mb-4">Add Vendor</h2>
            <input placeholder="Vendor Name" className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600" />
            <button onClick={() => setShowVendorModal(false)} className="mt-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded dark:bg-gray-700 dark:text-white">
              Close
            </button>
          </div>
        </div>
      )}

      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold text-pink-600 mb-4">Add User</h2>
            <input placeholder="User Name" className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600" />
            <button onClick={() => setShowUserModal(false)} className="mt-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded dark:bg-gray-700 dark:text-white">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
