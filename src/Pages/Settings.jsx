import React, { useState } from "react";

export default function Settings() {
  const [siteName, setSiteName] = useState("Wedding Bells");
  const [adminEmail, setAdminEmail] = useState("admin@example.com");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = () => {
    // For now, just alert the values — later connect to backend
    alert(`Settings saved:
    Site Name: ${siteName}
    Admin Email: ${adminEmail}
    Notifications: ${notificationsEnabled ? "On" : "Off"}`);
  };

  return (
    <div className="p-10 bg-pink-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white max-w-md">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Site Name</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Admin Email</label>
          <input
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="notifications"
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label htmlFor="notifications" className="font-semibold">
            Enable Notifications
          </label>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
