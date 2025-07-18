import React from 'react';
import { motion } from 'framer-motion';

export default function StepWrapper({ title, children, onSubmit }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-100 flex items-center justify-center p-6">
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-pink-600 text-center">{title}</h2>
        {children}
      </motion.form>
    </div>
  );
}