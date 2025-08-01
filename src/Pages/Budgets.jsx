import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { db } from "../firebase";
import {
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import {
  Wallet, HeartHandshake, ArrowDownCircle, ArrowUpCircle,
  PlusCircle, List, PieChart as PieChartIcon
} from "lucide-react";

const COLORS = ["#ec4899", "#10b981"];

export default function Budgets() {
  const userId = "demoUser"; // Replace with actual auth user ID
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newBudget, setNewBudget] = useState("");

  // Load budget info
  useEffect(() => {
    const budgetDocRef = doc(db, "budgets", userId, "info", "main");
    getDoc(budgetDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        setBudget(docSnap.data().totalBudget || 0);
      }
    });
  }, []);

  // Real-time expenses
  useEffect(() => {
    const expensesRef = collection(db, "budgets", userId, "expenses");
    const unsub = onSnapshot(expensesRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
    });
    return () => unsub();
  }, []);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - totalSpent;

  const pieData = [
    { name: "Spent", value: totalSpent },
    { name: "Remaining", value: remaining },
  ];

  const addExpense = async (e) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;
    const expenseRef = collection(db, "budgets", userId, "expenses");
    await addDoc(expenseRef, {
      title: newTitle,
      amount: parseFloat(newAmount),
      createdAt: new Date(),
    });
    setNewTitle("");
    setNewAmount("");
  };

  const handleSetBudget = async () => {
    if (!newBudget) return;
    const budgetDocRef = doc(db, "budgets", userId, "info", "main");
    await setDoc(budgetDocRef, { totalBudget: parseFloat(newBudget) });
    setBudget(parseFloat(newBudget));
    setNewBudget("");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 text-center flex items-center justify-center gap-2">
        <HeartHandshake className="w-7 h-7 text-pink-500" />
        Wedding Budget Tracker
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Overview */}
        <div className="bg-pink-50 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-pink-600" />
            Overview
          </h2>

          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 text-center gap-2">
            <div className="flex flex-col items-center">
              <Wallet className="w-5 h-5 text-gray-500" />
              <p className="text-sm text-gray-500">Budget</p>
              <p className="text-lg font-semibold">${budget}</p>
            </div>
            <div className="flex flex-col items-center">
              <ArrowDownCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-gray-500">Spent</p>
              <p className="text-lg font-semibold text-red-500">${totalSpent}</p>
            </div>
            <div className="flex flex-col items-center">
              <ArrowUpCircle className="w-5 h-5 text-green-500" />
              <p className="text-sm text-gray-500">Remaining</p>
              <p className="text-lg font-semibold text-green-500">${remaining}</p>
            </div>
          </div>

          {/* Budget Setter */}
          <div className="mt-6">
            <input
              type="number"
              placeholder="Set Total Budget"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="p-3 rounded border border-gray-300 shadow-sm w-full mb-2"
            />
            <button
              onClick={handleSetBudget}
              className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition font-semibold"
            >
              Update Budget
            </button>
          </div>
        </div>

        {/* Add Expense + List */}
        <div>
          <form onSubmit={addExpense} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Expense Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="p-3 rounded border border-gray-300 shadow-sm"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="p-3 rounded border border-gray-300 shadow-sm"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white font-semibold px-4 py-2 rounded hover:bg-pink-600 transition flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Add
            </button>
          </form>

          <h2 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
            <List className="w-5 h-5 text-pink-600" />
            Expenses
          </h2>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {expenses.map((exp, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-lg shadow-sm"
              >
                <span className="text-gray-600">{exp.title}</span>
                <span className="text-pink-600 font-medium">${exp.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




