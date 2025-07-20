import React, { useState, useEffect } from "react";

export default function MedicineForm({ onSubmit, current, theme }) {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
    room: "",
    addedBy: "",
    notes: "",
  });

  useEffect(() => {
    if (current) setForm(current);
  }, [current]);

  const isDark = theme === "dark";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      quantity: "",
      expiryDate: "",
      room: "",
      addedBy: "",
      notes: "",
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto px-3 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className={`rounded-2xl shadow-md border p-4 sm:p-6 space-y-5 transition-all duration-300 ${
          isDark
            ? "bg-white/5 backdrop-blur-sm border-purple-400/20 text-white"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      >
        <h2
          className={`text-lg sm:text-2xl font-semibold ${
            isDark ? "text-purple-300" : "text-blue-700"
          }`}
        >
          {current ? "✏️ Edit" : "➕ Add"} Medicine
        </h2>

        {/* Input Fields */}
        {[
          {
            name: "name",
            label: "Medicine Name",
            type: "text",
            placeholder: "e.g. Paracetamol",
          },
          {
            name: "quantity",
            label: "Quantity",
            type: "number",
            placeholder: "e.g. 10",
          },
          {
            name: "expiryDate",
            label: "Expiry Date",
            type: "date",
            placeholder: "",
          },
          {
            name: "room",
            label: "Room",
            type: "text",
            placeholder: "e.g. Kitchen",
          },
          {
            name: "addedBy",
            label: "Added By",
            type: "text",
            placeholder: "Your name (optional)",
          },
        ].map(({ name, label, type, placeholder }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className={`block mb-1 text-sm font-medium ${
                isDark ? "text-purple-200" : "text-gray-700"
              }`}
            >
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required={name !== "addedBy"}
              className={`w-full p-3 rounded-lg border outline-none transition-all ${
                isDark
                  ? "bg-transparent border-purple-400 text-white placeholder-purple-400 focus:ring-2 focus:ring-purple-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              }`}
            />
          </div>
        ))}

        {/* Notes Field */}
        <div>
          <label
            htmlFor="notes"
            className={`block mb-1 text-sm font-medium ${
              isDark ? "text-purple-200" : "text-gray-700"
            }`}
          >
            Notes (optional)
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any special instructions..."
            className={`w-full p-3 rounded-lg border outline-none resize-none transition ${
              isDark
                ? "bg-transparent border-purple-400 text-white placeholder-purple-400 focus:ring-2 focus:ring-purple-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold transition ${
            isDark
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {current ? "Update Medicine" : "Add Medicine"}
        </button>
      </form>
    </div>
  );
}
