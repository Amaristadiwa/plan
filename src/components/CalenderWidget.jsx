// src/components/CalendarWidget.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function CalendarWidget({ onDateSelect }) {
  const [value, setValue] = useState(new Date());

  const handleChange = (date) => {
    setValue(date);
    onDateSelect && onDateSelect(date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
      <h3 className="text-lg font-semibold text-pink-600 mb-2">Wedding Calendar</h3>
      <Calendar onChange={handleChange} value={value} />
      <p className="mt-3 text-sm">Selected: {value.toDateString()}</p>
    </div>
  );
}
