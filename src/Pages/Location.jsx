import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanning } from '../components/context/Planningcontext';
import { motion } from 'framer-motion';

export default function Location() {
  const navigate = useNavigate();
  const { form, setForm } = usePlanning();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/start/guest-count');
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
          Step 3 of 6
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Wedding Location
        </h2>

        {/* Form */}
        <form onSubmit={handleNext} className="space-y-6">
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Victoria Falls"
            className="w-full px-5 py-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          {/* Map Image Preview */}
          <div className="mt-4 rounded-lg overflow-hidden shadow-md max-h-48">
            <img
              src="https://i.pinimg.com/736x/90/0b/6b/900b6bc090a0308d3b17be2e959087cf.jpg"
              alt="Map preview of Victoria Falls"
              className="w-full h-full object-cover"
            />
          </div>

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