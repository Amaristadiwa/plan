import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Circle } from "rc-progress";
import { FiMenu, FiCalendar, FiCheckCircle, FiClock } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import Sidebar from "../components/Sidebar";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function CoupleDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalSteps = 7;
  const completionPercent = (completedSteps / totalSteps) * 100;

  const weddingDate = new Date("2025-12-20");
  const today = new Date();
  const daysLeft = Math.ceil((weddingDate - today) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "couple") navigate("/login");
  }, [navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    async function fetchProgress() {
      if (!auth.currentUser) return;

      const planRef = doc(db, "weddingPlans", auth.currentUser.uid);
      const planSnap = await getDoc(planRef);

      if (planSnap.exists()) {
        const data = planSnap.data();
        setCompletedSteps(data.completedSteps || 0);
      } else {
        // Optionally create a doc if not exist
        await updateDoc(planRef, {
          completedSteps: 0,
          totalSteps: totalSteps,
          isComplete: false,
        }).catch(() => {});
      }
    }

    fetchProgress();
  }, []);

  async function completeStep(newCompletedSteps) {
    if (!auth.currentUser) return;

    const planRef = doc(db, "weddingPlans", auth.currentUser.uid);
    const isComplete = newCompletedSteps >= totalSteps;

    try {
      await updateDoc(planRef, {
        completedSteps: newCompletedSteps,
        isComplete: isComplete,
      });
      setCompletedSteps(newCompletedSteps);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  }

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/start/couple-names");
  };

  return (
    <div className="min-h-screen flex bg-pink-50 text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 pt-20 px-6 sm:px-10 lg:px-16 md:ml-64 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 rounded-md text-pink-600 hover:bg-pink-100 dark:hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label="Open menu"
          >
            <FiMenu size={28} />
          </button>

          {/* Welcome Message */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-extrabold text-pink-600 mb-1 tracking-wide">
              Welcome to Your Wedding Hub
            </h1>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
              🎉 {daysLeft} days until your big day!
            </p>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hidden md:inline bg-pink-600 px-5 py-2 text-white rounded-full text-sm font-semibold shadow hover:bg-pink-700 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Link
            to="/tasks"
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-start space-y-3"
          >
            <HiOutlineClipboardList className="text-pink-600 w-8 h-8" />
            <h3 className="text-xl font-semibold text-pink-600">Manage Tasks</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Track and organize your wedding tasks efficiently.
            </p>
          </Link>

          <Link
            to="/reminders"
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-start space-y-3"
          >
            <FiClock className="text-pink-600 w-8 h-8" />
            <h3 className="text-xl font-semibold text-pink-600">Reminders</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Never forget anything important with custom reminders.
            </p>
          </Link>

          <Link
            to="/calendar"
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-start space-y-3"
          >
            <FiCalendar className="text-pink-600 w-8 h-8" />
            <h3 className="text-xl font-semibold text-pink-600">Wedding Calendar</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Keep track of key events and your wedding timeline.
            </p>
          </Link>
        </div>

        {/* Planning Progress */}
        {!showSteps ? (
          <div className="max-w-md mx-auto text-center">
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 font-semibold">
              Get started with planning your dream wedding 🎉
            </p>
            <button
              onClick={handleNext}
              className="bg-pink-600 hover:bg-pink-700 transition-colors duration-300 text-white px-8 py-3 rounded-full font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300"
            >
              Start Planning
            </button>

            <div className="mt-14">
              <h2 className="text-2xl font-bold mb-6 text-pink-600">Progress</h2>
              <div className="w-44 mx-auto">
                <Circle
                  percent={completionPercent}
                  strokeWidth={12}
                  trailWidth={12}
                  strokeColor="#db2777" // a deeper pink for stroke
                  trailColor="#fde6ef"
                />
                <p className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-200">
                  {Math.round(completionPercent)}% complete
                </p>
                {completedSteps === totalSteps && (
                  <div className="mt-4 flex justify-center items-center text-pink-600 font-semibold space-x-2">
                    <FiCheckCircle size={24} />
                    <span>All steps completed! 🎉</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>{/* Optional additional steps UI */}</div>
        )}
      </main>
    </div>
  );
}









