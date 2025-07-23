// src/pages/CoupleDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Circle } from "rc-progress";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react"; // Hamburger icon

export default function CoupleDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(2);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle

  const weddingDate = new Date("2025-12-20");
  const today = new Date();
  const daysLeft = Math.ceil((weddingDate - today) / (1000 * 60 * 60 * 24));

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/start/couple-names");
  };

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
    <div className="min-h-screen flex bg-pink-50 text-gray-800 dark:bg-gray-900 dark:text-white transition relative">
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out
          bg-white dark:bg-gray-800 shadow-lg w-64
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:block
        `}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-md text-pink-600 focus:outline-none"
          >
            <Menu size={28} />
          </button>

          {/* Title and countdown */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-1">
              Welcome to Your Wedding Hub
            </h1>
            <p className="text-base sm:text-lg">🎉 {daysLeft} days until your big day!</p>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hidden md:inline bg-pink-500 px-4 py-2 text-white rounded-full text-sm hover:bg-pink-600 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <Link
            to="/tasks"
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-pink-600 mb-2">📝 Manage Tasks</h3>
            <p className="text-sm sm:text-base">Track and organize your wedding tasks efficiently.</p>
          </Link>

          <Link
            to="/reminders"
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-pink-600 mb-2">⏰ Reminders</h3>
            <p className="text-sm sm:text-base">Never forget anything important with custom reminders.</p>
          </Link>

          <Link
            to="/calendar"
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-pink-600 mb-2">📅 Wedding Calendar</h3>
            <p className="text-sm sm:text-base">Keep track of key events and your wedding timeline.</p>
          </Link>
        </div>

        {/* Planning Progress Section */}
        {!showSteps ? (
          <div className="text-center px-4">
            <p className="mb-6 text-base sm:text-lg">Get started with planning your dream wedding 🎉</p>
            <button
              onClick={handleNext}
              className="bg-pink-600 hover:bg-pink-700 transition-colors duration-300 text-white px-6 py-3 rounded-full"
            >
              Start Planning
            </button>

            <div className="mt-10">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Progress</h2>
              <div className="w-36 sm:w-40 mx-auto">
                <Circle
                  percent={completionPercent}
                  strokeWidth={10}
                  trailWidth={10}
                  strokeColor="#ec4899"
                  trailColor="#f3f4f6"
                />
                <p className="text-base font-medium mt-2">
                  {Math.round(completionPercent)}% complete
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>{/* Steps Content */}</div>
        )}
      </main>
    </div>
  );
}

