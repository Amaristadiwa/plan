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
    <section className="py-16 px-6 bg-white">
      <h3 className="text-3xl font-bold text-center text-blue-700">
        Why Choose Wedding Bells?
      </h3>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="rounded-lg shadow-md p-4 bg-blue-50 text-center">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-40 object-cover rounded"
            />
            <h4 className="mt-4 text-xl font-semibold text-pink-500">{feature.title}</h4>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
