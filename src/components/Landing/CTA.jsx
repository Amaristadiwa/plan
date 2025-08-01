import React from "react";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <div className="relative text-center py-24 px-6 overflow-hidden rounded-xl mx-4 shadow-lg ">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover "
      >
        <source src="https://media.istockphoto.com/id/1493154444/video/dinner-table-setting-at-wedding-reception-copy-space.mp4?s=mp4-640x640-is&k=20&c=UZGcTbjeMQfaEPxwJn1vVBwawcDFhK8QiWX4Ro8yTQ4=" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌸 Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-pink-300 opacity-70 rounded-full animate-floating-heart"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* 💬 Content */}
      <div className="relative z-10">
        <h3 className="text-4xl font-bold text-pink-600 mb-4 font-serif">Ready To Plan Your Special Day?</h3>
        <p className="text-lg text-pink-700">
          Join thousands of happy couples and planners already using <span className="font-bold">Wedding Bells</span>.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="mt-6 bg-pink-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-pink-600 transition duration-300"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
}


