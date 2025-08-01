import React from "react";

export default function Testimonials() {
  return (
    <div className="relative py-20 px-6 text-center bg-gradient-to-br from-pink-50 to-white overflow-hidden rounded-xl mx-4 shadow-lg mt-10">
      {/* 🌸 Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-pink-300 rounded-full opacity-60 animate-floating-heart"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* 💬 Testimonial Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h3 className="text-4xl font-bold text-pink-600 mb-10 font-serif">
          What Our Users Say
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg transform transition hover:scale-105">
            <p className="text-gray-700 italic">
              “Wedding Bells made our planning seamless and enjoyable! Highly recommend to any couple.”
            </p>
            <p className="mt-4 font-semibold text-pink-500">– Sarah & James</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg transform transition hover:scale-105">
            <p className="text-gray-700 italic">
              “As a planner, this app helped me manage multiple weddings stress-free. Incredible features!”
            </p>
            <p className="mt-4 font-semibold text-blue-500">– Olivia (Wedding Planner)</p>
          </div>
        </div>
      </div>
    </div>
  );
}


