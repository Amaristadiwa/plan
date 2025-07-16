import React from "react";

// ✅ Correct way
export default function Testimonials() {
  return (
    <div className="bg-white py-12 px-6 text-center">
      <h3 className="text-3xl font-bold text-blue-700 mb-6">What Our Users Say</h3>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-pink-50 p-6 rounded-lg shadow-md">
          <p className="text-gray-600">
            “Wedding Bells made our planning seamless and enjoyable! Highly recommend to any couple.”
          </p>
          <p className="mt-4 font-semibold text-pink-500">– Sarah & James</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <p className="text-gray-600">
            “As a planner, this app helped me manage multiple weddings stress-free. Incredible features!”
          </p>
          <p className="mt-4 font-semibold text-blue-500">– Olivia (Wedding Planner)</p>
        </div>
      </div>
    </div>
  );
}
