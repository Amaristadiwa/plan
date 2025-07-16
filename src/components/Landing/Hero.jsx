
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
const navigate = useNavigate();

  return (
    <div className="relative text-center px-6 py-20 bg-blue-50">
      <img
        src="https://i.pinimg.com/1200x/72/3d/8b/723d8b8d39811b68ca27c9a4f7004374.jpg"
        alt="Wedding Couple"
        className="absolute inset-0 w-full h-100 object-cover "
      />
      <h2 className="text-4xl md:text-6xl font-bold text-blue-700 relative z-10">
        Plan Your Dream Wedding Effortlessly
      </h2>
      <p className="text-lg mt-4 text-white-600 max-w-xl mx-auto relative z-10">
        For both wedding planners and couples — organize, customize, and celebrate your perfect day with ease.
      </p>
        <button
        onClick={() => navigate("/signup")}
        className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 relative z-10"
      >
        Start Planning
      </button>
    </div>
  );
}
