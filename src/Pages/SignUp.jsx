// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;

    if (!name || !email || !password || !role) {
      setError("Please fill in all fields and select a role.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set display name
      await updateProfile(user, { displayName: name });

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: serverTimestamp(),
      });

      localStorage.setItem("role", role);
      alert(`Registered successfully as ${role}`);

      // Navigate to respective dashboard
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/couple-dashboard");
      }

    } catch (err) {
      console.error("Signup error:", err.code, err.message);
      setError("Signup failed. " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">Create Your Account</h2>

        <label className="block text-pink-600 font-semibold mb-2 text-center">
          Select Your Role
        </label>
        <RoleSelector selectedRole={formData.role} onSelect={handleRoleSelect} />

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
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

          <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}



