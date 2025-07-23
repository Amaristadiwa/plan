import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Sidebar from "../components/Sidebar";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [reminderText, setReminderText] = useState("");
  const [date, setDate] = useState("");
  const reminderRef = collection(db, "reminders");

  const fetchReminders = async () => {
    const snapshot = await getDocs(reminderRef);
    setReminders(snapshot.docs.map((doc) => doc.data()));
  };

  const addReminder = async () => {
    if (!reminderText.trim() || !date) return;

    const newReminder = { text: reminderText.trim(), date };

    await addDoc(reminderRef, newReminder);

    // Update UI instantly
    setReminders((prev) => [newReminder, ...prev]);

    setReminderText("");
    setDate("");
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 md:ml-64">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-600 mb-6">
          Reminders
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addReminder();
          }}
          className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-4xl"
        >
          <input
            value={reminderText}
            onChange={(e) => setReminderText(e.target.value)}
            placeholder="Enter reminder..."
            className="w-full flex-1 px-4 py-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-sm sm:text-base"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow-md text-sm sm:text-base"
          >
            Add
          </button>
        </form>

        <ul className="space-y-4 max-w-4xl w-full">
          {reminders.length === 0 && (
            <p className="text-gray-600 dark:text-gray-400">
              No reminders yet. Add one above!
            </p>
          )}

          {reminders.map((rem, idx) => (
            <li
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition"
            >
              <p className="text-base sm:text-lg font-semibold text-pink-600">{rem.text}</p>
              <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                {new Date(rem.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}


