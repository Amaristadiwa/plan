import React from "react";

const features = [
  {
    title: "Smart Budgeting",
    description:
      "Easily track your wedding expenses with real-time budget updates and smart spending suggestions.",
    icon: "💰",
  },
  {
    title: "Venue Booking",
    description:
      "Browse and book trusted wedding venues directly through the app with verified reviews.",
    icon: "🏰",
  },
  {
    title: "Guest List Management",
    description:
      "Invite guests, track RSVPs, and manage seating all from one place — stress-free.",
    icon: "📋",
  },
  {
    title: "Collaborate with Your Partner",
    description:
      "Plan every step together in real time with shared access and synced updates.",
    icon: "💑",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-pink-500 mb-4">
          Features Built for Your Big Day
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Wedding Bells helps couples and planners stay organized, inspired, and in control.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-pink-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
