import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 shadow-md bg-white">
      {/* App Name */}
      <Link to="/" className="text-2xl font-bold text-pink-500">
        Wedding Bells
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex space-x-6 text-blue-600 items-center">
        <li>
          <Link to="/features" className="hover:text-pink-500">Features</Link>
        </li>
        <li>
          <Link to="/how-it-works" className="hover:text-pink-500">How It Works</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-pink-500">About us</Link>
        </li>
        <li>
          <Link to="/faqs" className="hover:text-pink-500">FAQs</Link>
        </li>
        <li>
        <Link
  to="/signup"
  className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
>
  Get Started
</Link>
        </li>
      </ul>
    </nav>
  );
}

