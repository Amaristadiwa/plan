// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
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
  );
}

