import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import FAQs from "./Pages/FAQs";
import Features from "./Pages/Features";
import AboutUs from "./Pages/About us";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashbord";

export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
<Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    
  );
}


