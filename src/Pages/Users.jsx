import React, { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Elsie Mangate" },
    { id: 2, name: "John Doe" },
  ]);
  const [newUserName, setNewUserName] = useState("");

  const addUser = () => {
    if (newUserName.trim() === "") return;
    setUsers((prev) => [
      ...prev,
      { id: prev.length + 1, name: newUserName.trim() },
    ]);
    setNewUserName("");
  };

  return (
    <div className="p-6 sm:p-10 bg-pink-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 text-center sm:text-left">
        Users Management
      </h1>

      {/* Add User Form */}
      <div className="mb-6 flex flex-col sm:flex-row items-center sm:space-x-4 max-w-md mx-auto sm:mx-0">
        <input
          type="text"
          placeholder="Enter new user name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="w-full sm:w-64 p-2 rounded border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={addUser}
          className="mt-3 sm:mt-0 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
        >
          Add User
        </button>
      </div>

      {/* User List */}
      <ul className="space-y-3 max-w-md mx-auto sm:mx-0">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-3 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
          >
            <span className="text-base sm:text-lg">{user.name}</span>
            {/* Future: Add Edit/Delete buttons here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

