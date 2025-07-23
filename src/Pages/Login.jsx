// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth"; // Removed sendEmailVerification

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const role = localStorage.getItem("role");
      alert(`Logged in as ${role}!`);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/couple-dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}




