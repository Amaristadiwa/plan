import React from "react";

export default function ReminderCard({ reminder }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow w-full max-w-md mx-auto">
      <h4 className="text-pink-600 font-bold text-base sm:text-lg mb-1">
        {reminder.title}
      </h4>
      <p className="text-sm sm:text-base text-gray-500">
        Date: {reminder.date}
      </p>
      {reminder.notifyAt && (
        <p className="text-sm sm:text-base text-gray-400">
          Notify at: {reminder.notifyAt}
        </p>
      )}
    </div>
  );
}

