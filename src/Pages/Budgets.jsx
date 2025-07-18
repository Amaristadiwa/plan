// src/pages/Budget.jsx
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Budget() {
  const [selectedTab, setSelectedTab] = useState("expenses");
  const [budget, setBudget] = useState(10000); // default budget

  useEffect(() => {
    const savedBudget = localStorage.getItem("selectedBudget");
    if (savedBudget) setBudget(Number(savedBudget));
  }, []);

  const data = {
    labels: ["Basic", "Enjoyment", "Health Care", "Gifts", "Others"],
    datasets: [
      {
        label: "Expenses",
        data: [3000, 2000, 1500, 2500, 1000],
        backgroundColor: [
          "#ec4899",
          "#f9a8d4",
          "#f472b6",
          "#fda4af",
          "#fb7185"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Budget Overview</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">August 2024</h2>
          <div className="space-x-2">
            <button
              className={`px-4 py-1 rounded-full text-sm font-medium border ${
                selectedTab === "expenses" ? "bg-pink-500 text-white" : "border-pink-500 text-pink-500"
              }`}
              onClick={() => setSelectedTab("expenses")}
            >
              Expenses
            </button>
            <button
              className={`px-4 py-1 rounded-full text-sm font-medium border ${
                selectedTab === "income" ? "bg-pink-500 text-white" : "border-pink-500 text-pink-500"
              }`}
              onClick={() => setSelectedTab("income")}
            >
              Income
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="w-64 h-64">
              <Doughnut data={data} />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h3 className="text-lg font-semibold mb-4">13 August 2024</h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span>Fries</span>
                <span>-500</span>
              </li>
              <li className="flex justify-between">
                <span>Bike Petrol</span>
                <span>-1500</span>
              </li>
              <li className="flex justify-between">
                <span>Pants</span>
                <span>-600</span>
              </li>
              <li className="flex justify-between">
                <span>Salary</span>
                <span className="text-green-500">+8000</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
