import React from "react";

export default function CTA() {
  return (
    <div className=" text-center py-16 px-6 relative overflow-hidden">
      <img
        src="https://i.pinimg.com/736x/f2/71/4e/f2714e7f4a502c16f9e45fdade657bed.jpg"
        alt="Wedding Background"
        className="absolute inset-0 w-full h-100 object-cover "
      />
      <h3 className="text-3xl font-bold text-blue-700 relative z-10">Ready To Plan Your Special Day?</h3>
      <p className="mt-4 text-pink-600 relative z-10">
        Join thousands of happy couples and planners already using Wedding Bells.
      </p>
         <button
        onClick={() => navigate("/signup")}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 relative z-10"
      >
        Get Started Now
      </button>
    </div>
  );
}
