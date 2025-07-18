import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanning } from '../components/context/Planningcontext';
import { motion } from 'framer-motion';

export default function CoupleNames() {
  const navigate = useNavigate();
  const { form, setForm } = usePlanning();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/start/wedding-date');

  };

  return (
    <div className="min-h-screen bg-[url('https://i.pinimg.com/1200x/c6/7a/ab/c67aab481b7ab7447a058920495ce023.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full"
      >
        {/* Step Indicator */}
        <div className="text-sm text-pink-800 font-semibold mb-4 text-center">
          Step 1 of 6
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Your Names
        </h2>

        {/* Form */}
        <form onSubmit={handleNext} className="space-y-6">
          <input
            type="text"
            name="coupleNames"
            value={form.coupleNames}
            onChange={(e) => setForm({ ...form, coupleNames: e.target.value })}
            placeholder="e.g. Tadiwa & Chipo"
            className="w-full px-5 py-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-full transition duration-200"
          >
            Next
          </button>
        </form>
      </motion.div>
    </div>
  );
}