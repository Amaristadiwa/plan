import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanning } from '../components/context/Planningcontext';
import { motion } from 'framer-motion';

export default function Budget() {
  const navigate = useNavigate();
  const { form, setForm } = usePlanning();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/planning-summary');
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, budget: value });
  };

  const selectPreset = (amount) => {
    setForm({ ...form, budget: amount });
  };

  // Optional: recommend tiers based on ranges
  const budgetPresets = [
    {
      label: 'Modest Celebration',
      amount: 3000,
      description: 'Ideal for small, intimate gatherings.',
    },
    {
      label: 'Balanced Wedding',
      amount: 10000,
      description: 'Perfect for a well-rounded experience.',
    },
    {
      label: 'Luxury Affair',
      amount: 20000,
      description: 'Go all out with premium everything.',
    },
  ];

  return (
    <div className="min-h-screen bg-[url('https://i.pinimg.com/1200x/c6/7a/ab/c67aab481b7ab7447a058920495ce023.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-2xl w-full"
      >
        {/* Step Title */}
        <div className="text-sm text-pink-800 font-semibold mb-4 text-center">
          Step 6 of 6
        </div>
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Wedding Budget
        </h2>

        {/* Form */}
        <form onSubmit={handleNext} className="space-y-6">
          {/* Budget Input */}
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleBudgetChange}
            placeholder="e.g. 5000"
            className="w-full px-5 py-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
            min="100"
          />

          {/* Budget Preset Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {budgetPresets.map((option) => (
              <div
                key={option.amount}
                onClick={() => selectPreset(option.amount)}
                className={`cursor-pointer p-4 rounded-xl shadow-md transition hover:scale-105 bg-white/70 ${
                  parseInt(form.budget) === option.amount
                    ? 'border-4 border-pink-600'
                    : 'border border-transparent'
                }`}
              >
                <h3 className="text-lg font-bold text-pink-700">{option.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                <p className="text-xl font-semibold text-pink-900 mt-2">${option.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-full transition duration-200 mt-6"
          >
            Finish
          </button>
        </form>
      </motion.div>
    </div>
  );
}