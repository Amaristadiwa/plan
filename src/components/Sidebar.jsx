// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react"; // Close icon

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Sidebar (slide-in) */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-gray-800 shadow-lg p-6 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">My Wedding</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-pink-600">
            <X size={24} />
          </button>
        </div>
        <nav className="space-y-4">
          <Link to="/couple-dashboard" className="text-pink-600 font-semibold block" onClick={onClose}>Dashboard</Link>
          <Link to="/tasks" className="hover:text-pink-500 block" onClick={onClose}>Task Manager</Link>
          <Link to="/reminders" className="hover:text-pink-500 block" onClick={onClose}>Reminders</Link>
          <Link to="/calendar" className="hover:text-pink-500 block" onClick={onClose}>Calendar</Link>
          <Link to="/plan" className="hover:text-pink-500 block" onClick={onClose}>Plan</Link>
          <Link to="/vendor" className="hover:text-pink-500 block" onClick={onClose}>Vendors</Link>
          <Link to="/budgets" className="hover:text-pink-500 block" onClick={onClose}>Budget</Link>
          <Link to="/setting" className="hover:text-pink-500 block" onClick={onClose}>Settings</Link>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg p-6 z-10">
        <h2 className="text-2xl font-bold text-pink-600 mb-8">My Wedding</h2>
        <nav className="space-y-4">
          <Link to="/couple-dashboard" className="text-pink-600 font-semibold block">Dashboard</Link>
          <Link to="/tasks" className="hover:text-pink-500 block">Task Manager</Link>
          <Link to="/reminders" className="hover:text-pink-500 block">Reminders</Link>
          <Link to="/calendar" className="hover:text-pink-500 block">Calendar</Link>
          <Link to="/plan" className="hover:text-pink-500 block">Plan</Link>
          <Link to="/vendor" className="hover:text-pink-500 block">Vendors</Link>
          <Link to="/budgets" className="hover:text-pink-500 block">Budget</Link>
          <Link to="/setting" className="hover:text-pink-500 block">Settings</Link>
        </nav>
      </aside>
    </>
  );
}


