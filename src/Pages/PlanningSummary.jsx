import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanning } from '../components/context/Planningcontext';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  MapPin,
  Heart,
  Palette,
  DollarSign,
  Download,
  CheckCircle,
} from 'lucide-react';

export default function PlanSummary() {
  const { form } = usePlanning();
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.setItem('weddingPlan', JSON.stringify(form));
    navigate('/vendors');
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

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Wedding_Plan.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[url('https://i.pinimg.com/1200x/c6/7a/ab/c67aab481b7ab7447a058920495ce023.jpg')] bg-cover bg-center flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-lg w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-pink-700">
          Your Wedding Plan
        </h2>

        <ul className="space-y-4 text-base text-gray-800">
          <li className="flex items-center gap-3">
            <Heart className="text-pink-600" size={20} />
            <span><strong>Couple:</strong> {form.coupleNames}</span>
          </li>
          <li className="flex items-center gap-3">
            <Calendar className="text-pink-600" size={20} />
            <span><strong>Date:</strong> {form.weddingDate}</span>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="text-pink-600" size={20} />
            <span><strong>Location:</strong> {form.location}</span>
          </li>
          <li className="flex items-center gap-3">
            <Users className="text-pink-600" size={20} />
            <span><strong>Guest Count:</strong> {form.guestCount}</span>
          </li>
          <li className="flex items-center gap-3">
            <Palette className="text-pink-600" size={20} />
            <span><strong>Theme:</strong> {form.theme}</span>
          </li>
          <li className="flex items-center gap-3">
            <DollarSign className="text-pink-600" size={20} />
            <span><strong>Budget:</strong> ${form.budget}</span>
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full w-full transition"
          >
            <CheckCircle size={18} />
            Confirm & Save
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 border-2 border-pink-600 text-pink-700 hover:bg-pink-100 font-semibold px-6 py-3 rounded-full w-full transition"
          >
            <Download size={18} />
            Download Plan
          </button>
        </div>
      </motion.div>
    </div>
  );
}
