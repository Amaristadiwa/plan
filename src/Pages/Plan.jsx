// src/pages/Plan.jsx
import React from "react";

const planningSteps = [
  "Couple Names",
  "Wedding Date",
  "Location",
  "Guest Count",
  "Wedding Theme",
  "Budget",
  "Finalize Plan",
];

export default function Plan() {
  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Planning Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {planningSteps.map((step, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-pink-500 mb-2">Step {index + 1}</h2>
            <p>{step}</p>
            <button className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}