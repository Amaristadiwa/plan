// src/pages/Vendors.jsx
import React from "react";

const vendorCategories = [
  { name: "Photographers", vendors: 10 },
  { name: "Caterers", vendors: 10 },
  { name: "Florists", vendors: 10 },
  { name: "DJs & Music", vendors: 10 },
];

export default function Vendor() {
  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Browse Vendors</h1>

      {vendorCategories.map((category, i) => (
        <div key={i} className="mb-10">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(category.vendors)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg"
              >
                <img
                  src={`https://source.unsplash.com/400x250/?wedding,${category.name.toLowerCase()}`}
                  alt={category.name}
                  className="rounded-md mb-3 w-full h-40 object-cover"
                />
                <h3 className="text-lg font-semibold mb-1">Vendor {index + 1}</h3>
                <p className="text-sm mb-2">Contact: vendor{index + 1}@email.com</p>
                <button className="text-sm text-pink-600 underline">Message</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
