import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";

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
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const { name, email, password, role } = formData;

  if (!name || !email || !password || !role) {
    setError("Please fill in all fields and select a role.");
    return;
  }

  alert(`Registered as ${role}!`);

  // Store role in localStorage for later access
  localStorage.setItem("role", role);

  if (role === "admin") {
    navigate("/admin");
  } else {
    navigate("/couple-dashboard");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">
          Create Your Account
        </h2>

        {/* Role Selector First */}
        <div>
          <label className="block text-pink-600 font-semibold mb-2 text-center">
            Select Your Role
          </label>
          <RoleSelector selectedRole={formData.role} onSelect={handleRoleSelect} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

