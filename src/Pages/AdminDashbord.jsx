// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";
import {
  Users,
  Briefcase,
  CheckCircle,
  Clock4,
  LoaderCircle,
  LogOut,
  SunMoon,
  Edit2,
  Trash2,
  Check,
  X,
} from "lucide-react";

const COLORS = ["#ec4899", "#f9a8d4"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Real-time states
  const [couples, setCouples] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [weddings, setWeddings] = useState([]);
  const [finishedCount, setFinishedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);

  // Editing vendor states
  const [editingVendorId, setEditingVendorId] = useState(null);
  const [editingVendorName, setEditingVendorName] = useState("");

  // Redirect non-admins
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/login");
  }, [navigate]);

  // Toggle dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Setup real-time listeners
  useEffect(() => {
    setLoading(true);

    // Couples listener
    const couplesQuery = query(collection(db, "users"), orderBy("name"));
    const unsubscribeCouples = onSnapshot(couplesQuery, (snapshot) => {
      const filteredCouples = [];
      snapshot.forEach((doc) => {
        if (doc.data().role === "couple")
          filteredCouples.push({ id: doc.id, ...doc.data() });
      });
      setCouples(filteredCouples);
    });

    // Vendors listener
    const vendorsQuery = query(collection(db, "vendors"), orderBy("name"));
    const unsubscribeVendors = onSnapshot(vendorsQuery, (snapshot) => {
      const vendorList = [];
      snapshot.forEach((doc) => {
        vendorList.push({ id: doc.id, ...doc.data() });
      });
      setVendors(vendorList);
    });

    // Weddings listener (real-time)
    const weddingsQuery = query(collection(db, "weddings"), orderBy("createdAt", "desc"));
    const unsubscribeWeddings = onSnapshot(weddingsQuery, (snapshot) => {
      const weddingList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWeddings(weddingList);
      setFinishedCount(weddingList.filter((w) => w.isComplete === true).length);
      setPendingCount(weddingList.filter((w) => !w.isComplete).length);
      setLoading(false);
    });

    // Recent users (limit 3, descending createdAt)
    const recentUsersQuery = query(
      collection(db, "users"),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    const fetchRecentUsers = async () => {
      const recentSnap = await getDocs(recentUsersQuery);
      setRecentUsers(recentSnap.docs.map((doc) => doc.data()));
    };
    fetchRecentUsers();

    // Cleanup on unmount
    return () => {
      unsubscribeCouples();
      unsubscribeVendors();
      unsubscribeWeddings();
    };
  }, []);

  // Save edited vendor name
  const saveVendorName = async (vendorId) => {
    if (editingVendorName.trim() === "") return;
    try {
      const vendorRef = doc(db, "vendors", vendorId);
      await updateDoc(vendorRef, { name: editingVendorName.trim() });
      setEditingVendorId(null);
      setEditingVendorName("");
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  // Delete vendor
  const deleteVendor = async (vendorId) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
    try {
      await deleteDoc(doc(db, "vendors", vendorId));
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  const pieData = [
    { name: "Finished", value: finishedCount },
    { name: "Pending", value: pendingCount },
  ];

  const barData = [
    { name: "Couples", value: couples.length },
    { name: "Vendors", value: vendors.length },
    { name: "Finished Weddings", value: finishedCount },
    { name: "Pending Weddings", value: pendingCount },
  ];

  const cards = [
    {
      label: "Total Couples",
      value: couples.length,
      icon: <Users className="text-pink-500" />,
    },
    {
      label: "Total Vendors",
      value: vendors.length,
      icon: <Briefcase className="text-pink-500" />,
    },
    {
      label: "Finished Weddings",
      value: finishedCount,
      icon: <CheckCircle className="text-pink-500" />,
    },
    {
      label: "Pending Weddings",
      value: pendingCount,
      icon: <Clock4 className="text-pink-500" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white transition">
      <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="block font-semibold text-pink-600">
            Dashboard
          </Link>
          <Link to="/admin/users" className="block hover:text-pink-400">
            Users
          </Link>
          <Link to="/admin/vendors" className="block hover:text-pink-400">
            Vendors
          </Link>
          <Link to="/admin/weddings" className="block hover:text-pink-400">
            Weddings
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
            >
              <SunMoon size={18} />
              {darkMode ? "Light" : "Dark"} Mode
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("role");
                navigate("/login");
              }}
              className="text-sm underline text-pink-600 flex items-center gap-1"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <LoaderCircle className="animate-spin text-pink-500" size={48} />
          </div>
        ) : (
          <>
            {/* Cards summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md flex items-center gap-4"
                >
                  {card.icon}
                  <div>
                    <h3 className="text-gray-500 dark:text-gray-300 text-sm">
                      {card.label}
                    </h3>
                    <p className="text-2xl font-bold text-pink-500 mt-1">
                      {card.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-pink-600">
                  Wedding Status
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                      isAnimationActive={true}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-pink-600">
                  User Overview
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="#ec4899"
                      radius={[10, 10, 0, 0]}
                      isAnimationActive={true}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Signups */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-pink-600">
                Recent Signups
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="py-2">Name</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, idx) => (
                      <tr key={idx} className="border-t dark:border-gray-700">
                        <td className="py-2">{user.name || "—"}</td>
                        <td className="py-2">{user.email}</td>
                        <td className="py-2 capitalize">{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vendors management */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-pink-600 flex items-center justify-between">
                Vendors
              </h3>

              <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                {vendors.map((vendor) => (
                  <li
                    key={vendor.id}
                    className="flex items-center justify-between py-2"
                  >
                    {editingVendorId === vendor.id ? (
                      <>
                        <input
                          type="text"
                          value={editingVendorName}
                          onChange={(e) => setEditingVendorName(e.target.value)}
                          className="p-1 border rounded w-64 dark:bg-gray-700 dark:border-gray-600 text-gray-900"
                          autoFocus
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => saveVendorName(vendor.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Save"
                          >
                            <Check size={20} />
                          </button>
                          <button
                            onClick={() => {
                              setEditingVendorId(null);
                              setEditingVendorName("");
                            }}
                            className="text-red-600 hover:text-red-800"
                            title="Cancel"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>{vendor.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingVendorId(vendor.id);
                              setEditingVendorName(vendor.name);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteVendor(vendor.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
                {vendors.length === 0 && (
                  <li className="py-2 text-gray-500">No vendors found.</li>
                )}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
}








