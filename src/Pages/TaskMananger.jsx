import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import Sidebar from "../components/Sidebar";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const taskRef = collection(db, "tasks");
  const lastTaskRef = useRef(null);

  const fetchTasks = async () => {
    try {
      const q = query(taskRef, orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);
      const tasksList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log("Fetched tasks:", tasksList);
      setTasks(tasksList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    console.log("Adding task:", newTask.trim());
    try {
      await addDoc(taskRef, {
        title: newTask.trim(),
        createdAt: new Date().toISOString(),
        completed: false,
        category,
        dueDate: dueDate || null,
      });
      console.log("Task added successfully");
      setNewTask("");
      setCategory("General");
      setDueDate("");
      await fetchTasks();

      setTimeout(() => {
        lastTaskRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await updateDoc(doc(db, "tasks", task.id), {
        completed: !task.completed,
      });
      await fetchTasks();
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      await updateDoc(doc(db, "tasks", id), { title: editText.trim() });
      setEditingId(null);
      setEditText("");
      await fetchTasks();
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  console.log("Current tasks in state:", tasks);

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 text-gray-900 dark:text-white flex">
      <Sidebar />
      <main className="flex-1 ml-64 px-4 md:px-10 pt-24 md:pt-10">
        <h1 className="text-3xl font-extrabold text-pink-600 mb-8">Task Manager</h1>

        {/* Add Task Form */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What do you need to do?"
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm col-span-2"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-4 py-3 rounded-lg border shadow-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border shadow-sm"
          >
            <option>General</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Urgent</option>
          </select>
        </div>

        <button
          onClick={addTask}
          className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-3 rounded-lg shadow mb-10"
        >
          Add Task
        </button>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task.id}
                ref={index === tasks.length - 1 ? lastTaskRef : null}
                className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition
                  ${task.completed ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100" : "bg-white dark:bg-gray-800"}
                `}
              >
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    className="w-5 h-5"
                  />
                  {editingId === task.id ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEdit(task.id)}
                      autoFocus
                      className="flex-1 px-2 py-1 rounded border"
                    />
                  ) : (
                    <span
                      className={`flex-1 text-base ${task.completed ? "line-through opacity-60" : ""}`}
                      onDoubleClick={() => startEditing(task)}
                    >
                      {task.title}
                    </span>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-2 items-start md:items-center mt-2 md:mt-0">
                  {task.dueDate && (
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Due: {task.dueDate}
                    </span>
                  )}
                  <span className="text-xs font-medium bg-pink-200 text-pink-700 px-3 py-1 rounded-full">
                    {task.category}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}


