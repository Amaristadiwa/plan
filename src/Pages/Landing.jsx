import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import CTA from "../components/Landing/CTA";
import Footer from "../components/Footer";
import Testimonials from "../components/Landing/Testimonials";

export default function Landing() {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Testimonials />
      <Footer />
    </div>
  );
}
