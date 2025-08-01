import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase"; // Make sure you export `auth` from your firebase config

export default function Users() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("couple");
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user role on mount
  useEffect(() => {
    const fetchCurrentUserRole = async () => {
      if (!auth.currentUser) {
        setCurrentUserRole(null);
        return;
      }
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) {
        setCurrentUserRole(userDoc.data().role);
      } else {
        setCurrentUserRole(null);
      }
    };
    fetchCurrentUserRole();
  }, []);

  // Listen for users collection
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(fetchedUsers);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const addUser = async () => {
    if (newUserName.trim() === "" || newUserEmail.trim() === "") {
      alert("Name and Email cannot be empty");
      return;
    }

    try {
      if (currentUserRole === "admin") {
        // Admins can add new users with auto-generated ID
        await addDoc(collection(db, "users"), {
          name: newUserName.trim(),
          email: newUserEmail.trim(),
          role: newUserRole,
          createdAt: serverTimestamp(),
        });
      } else {
        // Non-admins can only update their own user document
        if (!auth.currentUser) {
          alert("You must be logged in");
          return;
        }
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(
          userDocRef,
          {
            name: newUserName.trim(),
            email: newUserEmail.trim(),
            role: newUserRole,
            createdAt: serverTimestamp(),
          },
          { merge: true } // merge to avoid overwriting other fields
        );
      }

      // Reset form fields
      setNewUserName("");
      setNewUserEmail("");
      setNewUserRole("couple");
    } catch (error) {
      console.error("Error adding/updating user:", error);
      alert("Failed to add or update user. Check console.");
    }
  };

  return (
    <div className="p-6 sm:p-10 bg-pink-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        Users Management
      </h1>

      {/* Add User Form */}
      <div className="grid gap-4 max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Enter name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="email"
          placeholder="Enter email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <select
          value={newUserRole}
          onChange={(e) => setNewUserRole(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="couple">Couple</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={addUser}
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
        >
          {currentUserRole === "admin" ? "Add User" : "Update My Profile"}
        </button>
      </div>

      {/* Users List */}
      <div className="max-w-xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <ul className="space-y-3">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-pink-500">{user.role}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
