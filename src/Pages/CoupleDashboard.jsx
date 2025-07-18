// src/pages/CoupleDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Circle } from "rc-progress";

export default function CoupleDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(2); // Dummy value for now

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "couple") navigate("/login");
  }, [navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const totalSteps = 7;
  const completionPercent = (completedSteps / totalSteps) * 100;

  return (
    <div className="flex min-h-screen bg-pink-50 text-gray-800 dark:bg-gray-900 dark:text-white transition">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-8">My Wedding</h2>
        <nav className="space-y-4">
          <Link to="/couple-dashboard" className="text-pink-600 font-semibold block">Dashboard</Link>
          <Link to="/plan" className="hover:text-pink-500 block">Plan</Link>
          <Link to="/vendor" className="hover:text-pink-500 block">Vendors</Link>
          <Link to="/budgets" className="hover:text-pink-500 block">Budget</Link>
          <Link to="/setting" className="hover:text-pink-500 block">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-24 md:pt-10 px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-600">Welcome to Your Wedding Hub</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-pink-500 px-4 py-2 mt-4 md:mt-0 text-white rounded-full text-sm"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {!showSteps ? (
          <div className="text-center">
            <p className="mb-6 text-lg">Get started with planning your dream wedding 🎉</p>
            <button
              onClick={() => setShowSteps(true)}
              className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-700"
            >
              Start Planning
            </button>

            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Progress</h2>
              <div className="w-40 mx-auto">
                <Circle
                  percent={completionPercent}
                  strokeWidth={10}
                  trailWidth={10}
                  strokeColor="#ec4899"
                  trailColor="#f3f4f6"
                />
                <p className="text-lg font-medium mt-2">{Math.round(completionPercent)}% complete</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-pink-500 mb-6">Your Planning Steps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/step-${i + 1}`)}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-pink-600 mb-1">Step {i + 1}</h3>
                  <p className="text-gray-600 dark:text-gray-300">Planning Step Description</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
