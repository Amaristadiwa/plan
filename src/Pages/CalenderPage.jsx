// src/pages/CalendarPage.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarWidget from "../components/CalenderWidget";
import Sidebar from "../components/Sidebar";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  <CalendarWidget onDateSelect={(date) => console.log("Selected:", date)} />

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 dark:bg-gray-900 dark:text-white">
      <Sidebar />

      {/* Page Content pushed to the right */}
      <main className="ml-64 p-6">
        <h1 className="text-2xl font-bold mb-4 text-pink-600">Calendar</h1>
        <div className="bg-white rounded-lg shadow-md p-4 w-fit">
          <Calendar
            onChange={setDate}
            value={date}
          />
          <p className="mt-4 font-medium">Selected Date: {date.toDateString()}</p>
        </div>

        {/* Optional: CalendarWidget if you still want to use it */}
        {/* <CalendarWidget onDateSelect={(date) => console.log("Selected:", date)} /> */}
      </main>
    </div>
  );
}

