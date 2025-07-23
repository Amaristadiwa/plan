// src/pages/CalendarPage.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarWidget from "../components/CalenderWidget";
import Sidebar from "../components/Sidebar";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 dark:bg-gray-900 dark:text-white flex flex-col md:flex-row">
      <Sidebar />

      {/* Page Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-pink-600">
          Calendar
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-md mx-auto">
          <Calendar
            onChange={setDate}
            value={date}
            className="w-full"
          />
          <p className="mt-4 text-center font-medium text-sm md:text-base">
            Selected Date: {date.toDateString()}
          </p>
        </div>
      </main>
    </div>
  );
}


