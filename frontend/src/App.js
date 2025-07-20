import React, { useEffect, useState } from "react";
import MedicineForm from "./components/MedicineForm";
import MedicineList from "./components/MedicineList";
import SearchFilter from "./components/SearchFilter";
import RoomFilter from "./components/RoomFilter";
import {
  getAllMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} from "./utils/api";
import "./index.css";

export default function App() {
  const [medicines, setMedicines] = useState([]);
  const [current, setCurrent] = useState(null);
  const [search, setSearch] = useState("");
  const [room, setRoom] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [theme, setTheme] = useState("light");

  // ✅ Load medicines
  useEffect(() => {
    loadMedicines();
  }, []);

  // ✅ Persist theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // ✅ Sync Tailwind's `dark` class with state
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const loadMedicines = async () => {
    const data = await getAllMedicines();
    setMedicines(data);
  };

  const handleAddOrUpdate = async (form) => {
    if (form._id) {
      await updateMedicine(form._id, form);
    } else {
      await addMedicine(form);
    }
    setCurrent(null);
    loadMedicines();
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await deleteMedicine(id);
    loadMedicines();
  };

  const handleQuantityChange = async (id, change) => {
    const med = medicines.find((m) => m._id === id);
    if (!med) return;
    const updated = {
      ...med,
      quantity: Math.max(0, med.quantity + change),
    };
    await updateMedicine(id, updated);
    loadMedicines();
  };

  const filtered = medicines.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchRoom = room === "All" || m.room === room;
    return matchSearch && matchRoom;
  });

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-[#1a1333] via-[#2b1f4a] to-[#261d40] text-gray-200"
          : "bg-gradient-to-br from-blue-50 via-green-50 to-white text-gray-900"
      } p-4 sm:p-6 font-sans`}
    >
      {/* Header */}
      <header className="text-center mb-6">
        <h1
          className={`text-2xl sm:text-4xl font-bold drop-shadow-sm ${
            isDark ? "text-purple-300" : "text-blue-700"
          }`}
        >
          🩺 Family Medicine Tracker
        </h1>
        <p
          className={`mt-1 sm:mt-2 text-sm sm:text-base ${
            isDark ? "text-purple-200" : "text-gray-600"
          }`}
        >
          Manage your medicines with elegance & ease
        </p>
      </header>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
        <button
          className={`w-full sm:w-auto px-4 py-2 rounded-full shadow ${
            isDark
              ? "bg-white text-gray-900 hover:bg-gray-100"
              : "bg-gray-900 text-white hover:bg-gray-800"
          } transition`}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button
          className="w-full sm:w-auto px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
          onClick={() => {
            setShowForm(!showForm);
            setCurrent(null);
          }}
        >
          {showForm ? "📋 View Medicine List" : "➕ Add New Medicine"}
        </button>
      </div>

      {/* Conditional Section */}
      {showForm ? (
        <div
          className={`max-w-3xl mx-auto rounded-xl shadow-md p-4 sm:p-6 border ${
            isDark
              ? "bg-white/10 backdrop-blur-md border-purple-400/30"
              : "bg-white border-gray-200"
          }`}
        >
          <MedicineForm
            onSubmit={handleAddOrUpdate}
            current={current}
            theme={theme}
          />
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-w-3xl mx-auto">
            <SearchFilter value={search} onChange={setSearch} />
            <RoomFilter
              medicines={medicines}
              value={room}
              onChange={setRoom}
            />
          </div>

          {/* Medicine List */}
          <div className="max-w-6xl mx-auto px-2">
            <MedicineList
              medicines={filtered}
              onEdit={(med) => {
                setCurrent(med);
                setShowForm(true);
              }}
              onDelete={handleDelete}
              onQuantityChange={handleQuantityChange}
              theme={theme}
            />
          </div>
        </>
      )}
    </div>
  );
}
