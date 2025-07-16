import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold text-pink-500">Wedding Bells</h1>
          <p className="text-sm text-gray-500 mt-2">
            Plan your perfect day with ease. For couples and planners.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4 text-sm text-blue-700">
          <a href="#" className="hover:text-pink-500">About</a>
          <a href="#" className="hover:text-pink-500">Features</a>
          <a href="#" className="hover:text-pink-500">FAQs</a>
          <a href="#" className="hover:text-pink-500">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-pink-500 text-lg">
          <a href="#"><FaFacebookF className="hover:text-blue-600" /></a>
          <a href="#"><FaInstagram className="hover:text-blue-600" /></a>
          <a href="#"><FaTwitter className="hover:text-blue-600" /></a>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm py-4 border-t border-gray-100">
        &copy; {new Date().getFullYear()} Wedding Bells. All rights reserved.
      </div>
    </footer>
  );
}