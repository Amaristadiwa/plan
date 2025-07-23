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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow w-full max-w-md mx-auto">
      <h3 className="text-lg md:text-xl font-semibold text-pink-600 mb-2 text-center">
        Wedding Calendar
      </h3>
      <Calendar
        onChange={handleChange}
        value={value}
        className="w-full"
      />
      <p className="mt-3 text-sm text-center">Selected: {value.toDateString()}</p>
    </div>
  );
}

