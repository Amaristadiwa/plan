// src/pages/Weddings.jsx
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Weddings() {
  const [newCouple, setNewCouple] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addWedding = async () => {
    if (!newCouple.trim() || !newDate || !newLocation.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "weddings"), {
        couple: newCouple.trim(),
        date: newDate,
        location: newLocation.trim(),
        isComplete: false, // default value, adjust if you track status
        createdAt: serverTimestamp(),
      });

      setNewCouple("");
      setNewDate("");
      setNewLocation("");
    } catch (err) {
      setError("Failed to add wedding. Try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-pink-700 mb-8 drop-shadow-md">
        Weddings
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addWedding();
        }}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md space-y-5"
      >
        <input
          type="text"
          placeholder="Couple Names (e.g., Elsie & Tadiwa)"
          value={newCouple}
          onChange={(e) => setNewCouple(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-pink-600 dark:text-white transition"
          required
          disabled={loading}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-pink-600 dark:text-white transition"
          required
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-pink-600 dark:text-white transition"
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Wedding"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}


