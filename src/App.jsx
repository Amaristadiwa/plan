// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// 🏠 Public Pages
import Landing from "./Pages/Landing";
import FAQs from "./Pages/FAQs";
import Features from "./Pages/Features";
import AboutUs from "./Pages/About us";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";

// 🛠️ Admin Pages
import AdminDashboard from "./Pages/AdminDashbord";
import Users from "./Pages/Users";
import Vendors from "./Pages/Vendors";
import Weddings from "./Pages/Weddings";
import Settings from "./Pages/Settings";

// 💍 Couple Dashboard + Tools
import CoupleDashboard from "./Pages/CoupleDashboard";
import Plan from "./Pages/Plan";
import Vendor from "./Pages/Vendor";
import Budgets from "./Pages/Budgets";
import Setting from "./Pages/Setting";
import TaskManager from "./Pages/TaskMananger";
import Reminders from "./Pages/Reminders";
import CalendarPage from "./Pages/CalenderPage";

// 🧭 Wedding Planning Steps (Wizard)
import CoupleNames from "./Pages/CoupleNames";
import WeddingDate from "./Pages/WeddingDate";
import Location from "./Pages/Location";
import GuestCount from "./Pages/GuestCount";
import Theme from "./Pages/Theme";
import Budget from "./Pages/Budget";
import PlanningSummary from "./Pages/PlanningSummary";

import "./index.css";

export default function App() {
  return (
    <Routes>
      {/* 🌐 Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* 🛠️ Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/vendors" element={<Vendors />} />
      <Route path="/admin/weddings" element={<Weddings />} />
      <Route path="/admin/settings" element={<Settings />} />

      {/* 💍 Couple Dashboard */}
      <Route path="/couple-dashboard" element={<CoupleDashboard />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/vendor" element={<Vendor />} />
      <Route path="/budgets" element={<Budgets />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/tasks" element={<TaskManager />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/calendar" element={<CalendarPage />} />

      {/* 🧭 Planning Wizard Steps */}
      <Route path="/start/couple-names" element={<CoupleNames />} />
      <Route path="/start/wedding-date" element={<WeddingDate />} />
      <Route path="/start/location" element={<Location />} />
      <Route path="/start/guest-count" element={<GuestCount />} />
      <Route path="/start/theme" element={<Theme />} />
      <Route path="/start/budget" element={<Budget />} />
      <Route path="/start/planning-summary" element={<PlanningSummary />} />
    </Routes>
  );
}



