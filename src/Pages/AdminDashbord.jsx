import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const COLORS = ["#ec4899", "#f9a8d4"];

export default function AdminDashboard() {
  const navigate = useNavigate();

  // UI states
  const [darkMode, setDarkMode] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Firestore data
  const [userCount, setUserCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);
  const [weddingCount, setWeddingCount] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        setUserCount(usersSnapshot.size);

        const vendorsSnapshot = await getDocs(collection(db, "vendors"));
        setVendorCount(vendorsSnapshot.size);

        const weddingsSnapshot = await getDocs(collection(db, "weddings"));
        setWeddingCount(weddingsSnapshot.size);

        const pending = weddingsSnapshot.docs.filter(
          (doc) => doc.data().status === "pending"
        );
        setPendingRequests(pending.length);
      } catch (error) {
        console.error("Failed to fetch Firestore data:", error);
      }
    };

    fetchCounts();
  }, []);

  const pieData = [
    { name: "Completed", value: 75 },
    { name: "Incomplete", value: 25 },
  ];

  const barData = [
    { name: "User Invites", value: userCount },
    { name: "Vendor Requests", value: vendorCount },
    { name: "Events", value: weddingCount },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-pink-50 text-gray-800 dark:bg-gray-900 dark:text-white transition">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-8">Wedding Admin</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="block text-pink-600 font-semibold">Dashboard</Link>
          <Link to="/admin/users" className="block hover:text-pink-500">Users</Link>
          <Link to="/admin/vendors" className="block hover:text-pink-500">Vendors</Link>
          <Link to="/admin/weddings" className="block hover:text-pink-500">Weddings</Link>
          <Link to="/admin/settings" className="block hover:text-pink-500">Settings</Link>
        </nav>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
            <button
              className="self-end mb-4 text-pink-600 hover:text-pink-800"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-pink-600 mb-8">Wedding Admin</h2>
            <nav className="space-y-4">
              <Link to="/admin" onClick={handleLinkClick} className="block text-pink-600 font-semibold">Dashboard</Link>
              <Link to="/admin/users" onClick={handleLinkClick} className="block hover:text-pink-500">Users</Link>
              <Link to="/admin/vendors" onClick={handleLinkClick} className="block hover:text-pink-500">Vendors</Link>
              <Link to="/admin/weddings" onClick={handleLinkClick} className="block hover:text-pink-500">Weddings</Link>
              <Link to="/admin/settings" onClick={handleLinkClick} className="block hover:text-pink-500">Settings</Link>
            </nav>
          </aside>
        </div>
      )}

      {/* Mobile Top Navbar */}
      <nav className="md:hidden bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center w-full fixed top-0 left-0 z-50">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-pink-600">Wedding Admin</h2>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20 md:pt-10 px-4 md:px-10 overflow-auto">
        <div className="hidden md:flex justify-between items-center mb-8">
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
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowVendorModal(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full sm:w-auto"
          >
            + Add Vendor
          </button>
          <button
            onClick={() => setShowUserModal(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full sm:w-auto"
          >
            + Add User
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Users", value: userCount },
            { label: "Vendors", value: vendorCount },
            { label: "Weddings Planned", value: weddingCount },
            { label: "Pending Requests", value: pendingRequests },
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <h3 className="text-sm text-gray-500 dark:text-gray-300">{card.label}</h3>
              <p className="text-3xl font-bold text-pink-600 mt-2">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}



