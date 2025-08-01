import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Trash2, Pencil, Search, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", business: "", bank: "", idNumber: "" });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const vendorCollection = collection(db, "vendors");

  useEffect(() => {
    getVendors();
  }, []);

  const getVendors = async () => {
    const data = await getDocs(vendorCollection);
    setVendors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateDoc(doc(db, "vendors", editId), form);
        setEditId(null);
      } else {
        await addDoc(vendorCollection, { ...form, timestamp: serverTimestamp() });
      }
      setForm({ name: "", business: "", bank: "", idNumber: "" });
      getVendors();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "vendors", id));
    setConfirmDeleteId(null);
    getVendors();
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter ? vendor.business === filter : true;
    return matchesSearch && matchesFilter;
  });

  const uniqueCategories = [...new Set(vendors.map((v) => v.business))];

  return (
    <div className="p-6 space-y-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-pink-600 text-center">Vendor Management</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full px-5 py-3 border border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute top-3 right-4 text-pink-400" size={20} />
        </div>
        <div className="relative w-full md:w-64">
          <select
            className="w-full px-5 py-3 border border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Vendor Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-xl w-full"
      >
        <input
          type="text"
          placeholder="Vendor Name"
          className="w-full px-4 py-2 border rounded-xl"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Business Type"
          className="w-full px-4 py-2 border rounded-xl"
          value={form.business}
          onChange={(e) => setForm({ ...form, business: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Banking Details"
          className="w-full px-4 py-2 border rounded-xl"
          value={form.bank}
          onChange={(e) => setForm({ ...form, bank: e.target.value })}
        />
        <input
          type="text"
          placeholder="ID Number"
          className="w-full px-4 py-2 border rounded-xl"
          value={form.idNumber}
          onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
        />
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-xl"
            disabled={loading}
          >
            {editId ? "Update Vendor" : "Add Vendor"}
          </button>
          {editId && (
            <button
              type="button"
              className="text-sm text-gray-500 underline"
              onClick={() => {
                setEditId(null);
                setForm({ name: "", business: "", bank: "", idNumber: "" });
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Vendor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-pink-50 shadow-md rounded-2xl p-5 space-y-2 transition duration-200 hover:shadow-lg hover:-translate-y-1"
          >
            <h2 className="text-lg font-semibold text-pink-700">{vendor.name}</h2>
            <p><strong>Business:</strong> {vendor.business}</p>
            <p><strong>Bank:</strong> {vendor.bank}</p>
            <p><strong>ID:</strong> {vendor.idNumber}</p>
            <div className="flex gap-4 mt-2">
              <button
                className="text-blue-500 hover:text-blue-600"
                onClick={() => {
                  setEditId(vendor.id);
                  setForm({
                    name: vendor.name,
                    business: vendor.business,
                    bank: vendor.bank,
                    idNumber: vendor.idNumber,
                  });
                }}
              >
                <Pencil size={18} />
              </button>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => setConfirmDeleteId(vendor.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg space-y-4 max-w-sm">
            <h2 className="text-lg font-semibold text-red-600">Confirm Delete</h2>
            <p>Are you sure you want to delete this vendor?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-1 rounded-xl border text-gray-600 hover:bg-gray-100"
              >Cancel</button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-1 rounded-xl bg-red-500 text-white hover:bg-red-600"
              >Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}









