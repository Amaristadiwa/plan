import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Section with Hero Image */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-pink-500 mb-6 text-center md:text-left">
              About Wedding Bells
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center md:text-left">
              At Wedding Bells, we believe your special day should be filled with joy — not stress.
              We're a passionate team of wedding experts, designers, and developers
              dedicated to making wedding planning effortless and inspiring.
            </p>
            <img
              src="https://i.pinimg.com/736x/9e/21/7d/9e217d7f587f8b05ddadeaeeaedc4420.jpg"
              alt="Wedding decor"
              className="rounded-xl shadow-lg mt-4 block md:hidden"
            />
          </div>
          <div className="hidden md:block">
            <img
              src="https://i.pinimg.com/736x/60/7d/57/607d57b6a5eebbb077ab8a7d2f7e751f.jpg"
              alt="Wedding couple"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Mission & Why Us Section */}
        <div className="grid md:grid-cols-2 gap-12 px-10 py-16">
          <div>
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h3>
            <p className="text-gray-700 text-lg">
              To empower couples and planners with tools that simplify every aspect of wedding
              planning — from dream to "I do". Whether it's venue search, budgeting, or guest lists,
              we bring elegance and ease to your fingertips.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Why Wedding Bells?</h3>
            <p className="text-gray-700 text-lg">
              Because weddings should be magical, not stressful. Our all-in-one app keeps
              everything organized so you can focus on what matters most: love and celebration.
              Plus, our elegant interface makes planning feel like part of the joy.
            </p>
          </div>
        </div>

        {/* Decorative Section with Image */}
        <div className="bg-pink-100 p-10 rounded-b-3xl flex flex-col items-center">
          <h3 className="text-xl font-semibold text-pink-600 mb-4">Meet the Team Behind the Magic</h3>
          <p className="text-gray-700 max-w-2xl text-center mb-6">
            We’re designers, developers, and event planners who love love. Together, we’re building
            the future of wedding planning — one elegant experience at a time.
          </p>
          <img
            src="https://i.pinimg.com/736x/68/94/17/6894174089ae6eb2e32aebe16af1d114.jpg"
            alt="Wedding team"
            className="w-full h-100 max-w-xl rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

