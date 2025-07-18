import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanning } from '../components/context/Planningcontext';
import { motion } from 'framer-motion';

const themes = [
  {
    name: 'Rustic',
    img: 'https://i.pinimg.com/736x/cd/7d/04/cd7d04fc0bc2483ce0948287ccebc781.jpg',
  },
    {
    name: 'Beach',
    img: 'https://i.pinimg.com/736x/ae/34/f8/ae34f8e89d05d28e6287b3deac4bf59e.jpg',
  },
  {
    name: 'Boho',
    img: 'https://i.pinimg.com/736x/bd/ef/84/bdef84aa905dad69ae717c830c40f234.jpg',
  },
  {
    name: 'Modern',
    img: 'https://i.pinimg.com/736x/2a/f0/4b/2af04b0196e22755f7dc3f28c4716a90.jpg',
  },
  {
    name: 'Mafia',
    img: 'https://i.pinimg.com/736x/7b/9c/6e/7b9c6ea0236913325a3fb9a95d78eaba.jpg',
  },
  {
    name: 'Vintage',
    img: 'https://i.pinimg.com/736x/ce/cf/0e/cecf0e11a43a54010aaa5c6a4673ced8.jpg',
  },
];

export default function Theme() {
  const navigate = useNavigate();
  const { form, setForm } = usePlanning();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/start/budget');
  };

  const selectTheme = (themeName) => {
    setForm({ ...form, theme: themeName });
  };

  return (
    <div className="min-h-screen bg-[url(https://i.pinimg.com/1200x/c6/7a/ab/c67aab481b7ab7447a058920495ce023.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-2xl w-full"
      >
        {/* Step Indicator */}
        <div className="text-sm text-pink-800 font-semibold mb-4 text-center">
          Step 5 of 6
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Wedding Theme
        </h2>

        <form onSubmit={handleNext} className="space-y-6">
          {/* Input field */}
          <input
            type="text"
            name="theme"
            value={form.theme}
            onChange={(e) => setForm({ ...form, theme: e.target.value })}
            placeholder="e.g. Rustic, Boho, Modern"
            className="w-full px-5 py-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          {/* Theme image grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
            {themes.map(({ name, img }) => (
              <div
                key={name}
                onClick={() => selectTheme(name)}
                className={`relative cursor-pointer rounded-xl border-4 overflow-hidden shadow-md transition-transform hover:scale-105 ${
                  form.theme === name ? 'border-pink-600' : 'border-transparent'
                }`}
              >
                <img
                  src={img}
                  alt={name}
                  className="object-cover w-full h-28"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs text-center py-1">
                  {name}
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
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