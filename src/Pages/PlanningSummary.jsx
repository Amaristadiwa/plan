// src/pages/PlanningSummary.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  MapPin,
  Heart,
  Palette,
  DollarSign,
  Download,
  CheckCircle,
  Edit2,
  XCircle,
} from "lucide-react";

import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function PlanSummary() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    coupleNames: "",
    weddingDate: "",
    location: "",
    guestCount: "",
    theme: "",
    budget: "",
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchPlan() {
      try {
        if (!auth.currentUser) {
          navigate("/login");
          return;
        }
        const docRef = doc(db, "weddingPlans", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForm(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching plan:", error);
        setMessage("Failed to load plan. Try refreshing.");
      } finally {
        setLoading(false);
      }
    }
    fetchPlan();
  }, [navigate]);

  const handleConfirm = async () => {
    try {
      setSaving(true);
      if (!auth.currentUser) {
        setMessage("You must be logged in to save.");
        return;
      }
      const docRef = doc(db, "weddingPlans", auth.currentUser.uid);
      await setDoc(docRef, form, { merge: true });
      setMessage("Wedding plan saved successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error saving plan:", error);
      setMessage("Failed to save plan. Please try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDownload = () => {
    const content = `
💍 Wedding Plan Summary 💍

Couple: ${form.coupleNames}
Date: ${form.weddingDate}
Location: ${form.location}
Guest Count: ${form.guestCount}
Theme: ${form.theme}
Budget: $${form.budget}
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Wedding_Plan.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="p-10 text-center">Loading plan...</div>;

  return (
    <div className="min-h-screen bg-[url('https://i.pinimg.com/1200x/c6/7a/ab/c67aab481b7ab7447a058920495ce023.jpg')] bg-cover bg-center flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-lg w-full space-y-6 z-10"
      >
        <h2 className="text-3xl font-bold text-center text-pink-700">
          Your Wedding Plan
        </h2>

        {message && (
          <div
            role="alert"
            className="text-center text-green-700 bg-green-100 rounded p-2 mb-4"
          >
            {message}
          </div>
        )}

        <ul className="space-y-4 text-base text-gray-800">
          {[
            {
              label: "Couple",
              icon: <Heart className="text-pink-600" size={20} />,
              name: "coupleNames",
              type: "text",
              placeholder: "Enter couple names",
            },
            {
              label: "Date",
              icon: <Calendar className="text-pink-600" size={20} />,
              name: "weddingDate",
              type: "date",
              placeholder: "",
            },
            {
              label: "Location",
              icon: <MapPin className="text-pink-600" size={20} />,
              name: "location",
              type: "text",
              placeholder: "Enter location",
            },
            {
              label: "Guest Count",
              icon: <Users className="text-pink-600" size={20} />,
              name: "guestCount",
              type: "number",
              placeholder: "Number of guests",
              min: 1,
            },
            {
              label: "Theme",
              icon: <Palette className="text-pink-600" size={20} />,
              name: "theme",
              type: "text",
              placeholder: "Enter wedding theme",
            },
            {
              label: "Budget",
              icon: <DollarSign className="text-pink-600" size={20} />,
              name: "budget",
              type: "number",
              placeholder: "Enter budget",
              min: 0,
            },
          ].map(({ label, icon, name, type, placeholder, min }) => (
            <li key={name} className="flex items-center gap-3">
              {icon}
              {!editMode ? (
                <span>
                  <strong>{label}:</strong>{" "}
                  {name === "budget"
                    ? `$${form[name]}`
                    : name === "weddingDate"
                    ? form[name]
                      ? new Date(form[name]).toLocaleDateString()
                      : ""
                    : form[name]}
                </span>
              ) : (
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  min={min}
                  value={form[name] || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [name]:
                        type === "number"
                          ? e.target.value
                            ? parseInt(e.target.value)
                            : ""
                          : e.target.value,
                    }))
                  }
                  className="border border-pink-400 rounded px-3 py-1 w-full max-w-xs"
                  aria-label={label}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mt-6">
          {!editMode ? (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center justify-center gap-2 border-2 border-pink-600 text-pink-700 hover:bg-pink-100 font-semibold px-6 py-3 rounded-full w-full transition"
                aria-label="Edit wedding plan"
              >
                <Edit2 size={18} />
                Edit Plan
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 border-2 border-pink-600 text-pink-700 hover:bg-pink-100 font-semibold px-6 py-3 rounded-full w-full transition"
                aria-label="Download wedding plan"
              >
                <Download size={18} />
                Download Plan
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleConfirm}
                disabled={saving}
                className={`flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full w-full transition ${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Save wedding plan"
              >
                <CheckCircle size={18} />
                {saving ? "Saving..." : "Save"}
              </button>

              {/* ✅ Confirm & Redirect button */}
              <button
                onClick={async () => {
                  await handleConfirm();
                  navigate("/plan");
                }}
                disabled={saving}
                className={`flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full w-full transition ${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Save and confirm plan"
              >
                <CheckCircle size={18} />
                {saving ? "Saving..." : "Confirm & Save"}
              </button>

              <button
                onClick={() => {
                  setEditMode(false);
                  setMessage(null);
                }}
                className="flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-100 font-semibold px-6 py-3 rounded-full w-full transition"
                aria-label="Cancel editing"
              >
                <XCircle size={18} />
                Cancel
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

