import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import FAQs from "./Pages/FAQs";
import Features from "./Pages/Features";
import AboutUs from "./Pages/About us";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";

// Admin pages
import AdminDashboard from "./Pages/AdminDashbord";
import Users from "./Pages/Users";
import Vendors from "./Pages/Vendors";
import Weddings from "./Pages/Weddings";
import Settings from "./Pages/Settings";

// Wedding couple pages
import CoupleDashboard from "./Pages/CoupleDashboard";
import CoupleNames from "./Pages/CoupleNames";
import WeddingDate from "./Pages/WeddingDate";
import Location from "./Pages/Location";
import GuestCount from "./Pages/GuestCount";
import Theme from "./Pages/Theme";
import Budget from "./Pages/Budget";
import PlanningSummary from "./Pages/PlanningSummary";
import './index.css'
export default function App() {
  return (
    
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard pages */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/vendors" element={<Vendors />} />
        <Route path="/admin/weddings" element={<Weddings />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* Wedding Couple Dashboard and steps */}
        <Route path="/couple-dashboard" element={<CoupleDashboard />} />
        <Route path="/couple-names" element={<CoupleNames />} />
        <Route path="/wedding-date" element={<WeddingDate />} />
        <Route path="/location" element={<Location />} />
        <Route path="/guest-count" element={<GuestCount />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/planning-summary" element={<PlanningSummary />} />
      </Routes>
   
  );
}
