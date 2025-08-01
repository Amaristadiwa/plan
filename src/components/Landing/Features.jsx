import React from "react";

const features = [
  {
    title: "Smart Budgeting",
    desc: "Track expenses and stay within budget effortlessly.",
    image: "https://i.pinimg.com/1200x/e4/65/78/e4657826fe71265919d558fbca7b8504.jpg",
  },
  {
    title: "Venue Booking",
    desc: "Find and book your dream venue in just a few clicks.",
    image: "https://i.pinimg.com/736x/68/94/17/6894174089ae6eb2e32aebe16af1d114.jpg",
  },
  {
    title: "Guest Management",
    desc: "Send invites, track RSVPs, and organize seating.",
    image: "https://i.pinimg.com/1200x/7a/07/5b/7a075b9ce90aa247385f0d2ea7b13f7c.jpg",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-pink-50">
      <h3 className="text-4xl font-bold text-center text-pink-600 font-serif">Why Choose Wedding Bells?</h3>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden shadow-lg transform transition hover:scale-105 bg-white"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-center">
              <h4 className="text-2xl font-semibold text-pink-500">{feature.title}</h4>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

