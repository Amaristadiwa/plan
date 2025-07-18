import React, { useState } from "react";

export default function Weddings() {
  const [weddings, setWeddings] = useState([
    { id: 1, couple: "Elsie & Tadiwa", date: "2025-12-01", location: "Harare" },
    { id: 2, couple: "John & Mary", date: "2026-01-15", location: "Bulawayo" },
  ]);
  const [newCouple, setNewCouple] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const addWedding = () => {
    if (!newCouple.trim() || !newDate || !newLocation.trim()) return;
    setWeddings((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        couple: newCouple.trim(),
        date: newDate,
        location: newLocation.trim(),
      },
    ]);
    setNewCouple("");
    setNewDate("");
    setNewLocation("");
  };

  return (
    <div className="p-10 bg-pink-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Weddings</h1>

      {/* Add Wedding Form */}
      <div className="mb-6 space-y-2 max-w-md">
        <input
          type="text"
          placeholder="Couple Names (e.g., Elsie & Tadiwa)"
          value={newCouple}
          onChange={(e) => setNewCouple(e.target.value)}
          className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          placeholder="Location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          onClick={addWedding}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Add Wedding
        </button>
      </div>

      {/* Weddings List */}
      <ul className="space-y-3 max-w-xl">
        {weddings.map(({ id, couple, date, location }) => (
          <li
            key={id}
            className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{couple}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{date} - {location}</p>
            </div>
            {/* Future: Add Edit/Delete buttons here */}
          </li>
        ))}
      </ul>
    </div>
  );
}
