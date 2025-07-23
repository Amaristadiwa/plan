// src/components/ReminderCard.jsx
import React from "react";

export default function ReminderCard({ reminder }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h4 className="text-pink-600 font-bold mb-1">{reminder.title}</h4>
      <p className="text-sm text-gray-500">Date: {reminder.date}</p>
      {reminder.notifyAt && (
        <p className="text-sm text-gray-400">Notify at: {reminder.notifyAt}</p>
      )}
    </div>
  );
}
