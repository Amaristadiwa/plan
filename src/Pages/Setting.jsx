import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom"; 


export default function Setting() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-md">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="you@example.com"
            />
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
