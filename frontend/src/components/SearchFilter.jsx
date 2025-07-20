import React from "react";

export default function SearchFilter({ value, onChange }) {
  return (
    <div className="w-full sm:w-auto mb-4 sm:mb-0">
      <input
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-64 px-4 py-2 rounded-xl border
                   border-gray-300 dark:border-gray-600
                   bg-white dark:bg-darkCard
                   text-gray-900 dark:text-white
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   transition-colors duration-200"
      />
    </div>
  );
}
