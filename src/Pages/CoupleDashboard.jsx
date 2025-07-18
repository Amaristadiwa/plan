import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const steps = [
  { id: 1, title: "Couple Names", route: "/couple-names" },
  { id: 2, title: "Wedding Date", route: "/wedding-date" },
  { id: 3, title: "Location", route: "/location" },
  { id: 4, title: "Guest Count", route: "/guest-count" },
  { id: 5, title: "Wedding Theme", route: "/theme" },
  { id: 6, title: "Budget", route: "/budget" },
  { id: 7, title: "Finalize Plan", route: "/plan" },
];

export default function CoupleDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "couple") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-pink-50 text-gray-800 dark:bg-gray-900 dark:text-white transition">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-8">My Wedding</h2>
        <nav className="space-y-4">
          <Link to="/couple-dashboard" className="text-pink-600 font-semibold block">Dashboard</Link>
          <Link to="/plan" className="hover:text-pink-500 block">Plan</Link>
          <Link to="/vendors" className="hover:text-pink-500 block">Vendors</Link>
          <Link to="/budget" className="hover:text-pink-500 block">Budget</Link>
          <Link to="/settings" className="hover:text-pink-500 block">Settings</Link>
        </nav>
      </aside>

      {/* Mobile Top Nav */}
      <nav className="md:hidden bg-white dark:bg-gray-800 shadow p-4 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
        <button onClick={() => setMobileMenuOpen(true)}>
          <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-pink-600">My Wedding</h2>
        <div className="space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-pink-500 px-3 py-1 text-white rounded-full text-sm"
          >
            {darkMode ? "Light" : "Dark"}
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
      </nav>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative bg-white dark:bg-gray-800 w-64 p-6 shadow-lg z-50">
            <button className="text-pink-600 mb-6" onClick={() => setMobileMenuOpen(false)}>✕</button>
            <nav className="space-y-4">
              <Link to="/couple-dashboard" onClick={() => setMobileMenuOpen(false)} className="text-pink-600 font-semibold block">Dashboard</Link>
              <Link to="/plan" onClick={() => setMobileMenuOpen(false)} className="hover:text-pink-500 block">Plan</Link>
              <Link to="/vendors" onClick={() => setMobileMenuOpen(false)} className="hover:text-pink-500 block">Vendors</Link>
              <Link to="/budget" onClick={() => setMobileMenuOpen(false)} className="hover:text-pink-500 block">Budget</Link>
              <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="hover:text-pink-500 block">Settings</Link>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-20 md:pt-10 px-4 md:px-10">
        <div className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-600">Wedding Planning Steps</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:border-gray-600"
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

        {/* Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(step.route)}
            >
              <h2 className="text-xl font-semibold text-pink-500 mb-2">Step {step.id}</h2>
              <p className="text-gray-700 dark:text-gray-300">{step.title}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
