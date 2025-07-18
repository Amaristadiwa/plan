import React, { useState } from "react";

export default function Vendors() {
  const [vendors, setVendors] = useState([
    { id: 1, name: "Floral Designs" },
    { id: 2, name: "Sweet Treats Bakery" },
  ]);
  const [newVendorName, setNewVendorName] = useState("");

  const addVendor = () => {
    if (newVendorName.trim() === "") return;
    setVendors((prev) => [
      ...prev,
      { id: prev.length + 1, name: newVendorName.trim() },
    ]);
    setNewVendorName("");
  };

  return (
    <div className="p-10 bg-pink-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Vendors Management</h1>

      {/* Add Vendor Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter new vendor name"
          value={newVendorName}
          onChange={(e) => setNewVendorName(e.target.value)}
          className="p-2 rounded border w-64 dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          onClick={addVendor}
          className="ml-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Add Vendor
        </button>
      </div>

      {/* Vendor List */}
      <ul className="space-y-2">
        {vendors.map((vendor) => (
          <li
            key={vendor.id}
            className="p-3 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
          >
            <span>{vendor.name}</span>
            {/* Future: Add Edit/Delete buttons here */}
          </li>
        ))}
      </ul>
    </div>
  );
}
