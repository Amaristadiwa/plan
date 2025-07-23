
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Heart, Calendar, MapPin, Users, Palette, DollarSign } from "lucide-react";
import Sidebar from "../components/Sidebar"; // ✅ import sidebar

export default function Plan() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlan() {
      if (!auth.currentUser) return;
      const docRef = doc(db, "weddingPlans", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      }
      setLoading(false);
    }
    fetchPlan();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading wedding plan...</div>;
  if (!form) return <div className="p-10 text-center">No wedding plan found.</div>;

  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar on the left */}
      <Sidebar />

      {/* ✅ Main content area */}
      <div className="flex-grow bg-gradient-to-br from-white to-pink-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">Your Wedding Plan</h2>
          <ul className="space-y-4 text-gray-700 text-base">
            <li className="flex items-center gap-2">
              <Heart className="text-pink-600" size={20} />
              <strong>Couple:</strong> {form.coupleNames}
            </li>
            <li className="flex items-center gap-2">
              <Calendar className="text-pink-600" size={20} />
              <strong>Date:</strong>{" "}
              {form.weddingDate ? new Date(form.weddingDate).toLocaleDateString() : ""}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="text-pink-600" size={20} />
              <strong>Location:</strong> {form.location}
            </li>
            <li className="flex items-center gap-2">
              <Users className="text-pink-600" size={20} />
              <strong>Guest Count:</strong> {form.guestCount}
            </li>
            <li className="flex items-center gap-2">
              <Palette className="text-pink-600" size={20} />
              <strong>Theme:</strong> {form.theme}
            </li>
            <li className="flex items-center gap-2">
              <DollarSign className="text-pink-600" size={20} />
              <strong>Budget:</strong> ${form.budget}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
