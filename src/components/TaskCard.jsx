// src/components/TaskCard.jsx
import React from "react";

export default function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-start">
      <div>
        <h3 className={`font-semibold text-lg mb-1 ${task.status === "complete" ? "line-through text-gray-500" : "text-pink-600"}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-500 mb-1">Due: {task.dueDate}</p>
        {task.notes && <p className="text-sm text-gray-400 italic">{task.notes}</p>}
      </div>
      <div className="flex flex-col items-end space-y-2">
        <button
          onClick={() => onToggle(task.id)}
          className="text-xs text-white bg-green-500 px-2 py-1 rounded hover:bg-green-600"
        >
          {task.status === "complete" ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
