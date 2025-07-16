// src/components/RoleSelector.jsx
import React from "react";

const roles = [
  {
    id: "admin",
    label: "Admin",
    description: "Manage the platform and users.",
    icon: (
      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2l3 7h7l-5.5 4.5L17 21l-5-3-5 3 1.5-7.5L2 9h7l3-7z" />
      </svg>
    ),
  },
  {
    id: "vendor",
    label: "Vendor",
    description: "Offer your wedding services.",
    icon: (
      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    id: "couple",
    label: "Wedding Couple",
    description: "Plan your dream wedding.",
    icon: (
      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function RoleSelector({ selectedRole, onSelect }) {
  return (
    <div className="flex justify-center gap-6 mt-6 flex-wrap">
      {roles.map(({ id, label, description, icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={`max-w-xs p-6 rounded-xl border-2 flex flex-col items-center text-center cursor-pointer transition
            ${
              selectedRole === id
                ? "border-pink-500 bg-pink-50 shadow-lg"
                : "border-gray-300 hover:border-pink-300"
            }`}
        >
          {icon}
          <h3 className="mt-4 text-lg font-semibold text-pink-600">{label}</h3>
          <p className="mt-2 text-gray-600 text-sm">{description}</p>
        </button>
      ))}
    </div>
  );
}
