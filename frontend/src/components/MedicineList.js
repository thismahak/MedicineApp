import React from "react";

export default function MedicineList({ medicines, onEdit, onDelete, onQuantityChange, theme }) {
  const isExpired = (date) => new Date(date) < new Date();
  const isDark = theme === "dark";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {medicines.map((med) => {
        const expired = isExpired(med.expiryDate);

        return (
          <div
            key={med._id}
            className={`rounded-2xl p-5 flex flex-col justify-between shadow-lg border transition-all duration-300 space-y-4
              ${
                isDark
                  ? `bg-darkCard text-white ${expired ? "border-red-500/50" : "border-purple-400/20"}`
                  : `bg-white text-gray-900 ${expired ? "border-red-400/60" : "border-gray-200"}`
              }`}
          >
            {/* Medicine Info */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-semibold tracking-wide">{med.name}</h3>

              <p className="text-sm sm:text-base">
                <span className="font-medium text-gray-500 dark:text-purple-200">Room:</span>{" "}
                {med.room || "N/A"}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <span>Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onQuantityChange(med._id, -1)}
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-400 text-white font-semibold"
                  >
                    −
                  </button>
                  <span className="font-semibold">{med.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(med._id, 1)}
                    className="px-3 py-1 rounded bg-green-500 hover:bg-green-400 text-white font-semibold"
                  >
                    ＋
                  </button>
                </div>
              </div>

              {/* Expiry Date */}
              <p className="text-sm sm:text-base">
                <span className="font-medium text-gray-500 dark:text-purple-200">Expiry:</span>{" "}
                {med.expiryDate?.slice(0, 10)}
                {expired && <span className="text-red-500 font-semibold ml-1">(Expired)</span>}
              </p>

              {/* Notes */}
              {med.notes && (
                <p className="text-sm italic text-gray-600 dark:text-gray-300">📝 {med.notes}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-3">
              <button
                onClick={() => onEdit(med)}
                className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(med._id)}
                className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium text-sm"
              >
                🗑️ Delete
              </button>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  med.name + " medicine uses in Hindi"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-medium text-sm text-center"
              >
                🔍 Google
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
