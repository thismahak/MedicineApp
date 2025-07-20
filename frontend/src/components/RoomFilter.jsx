import React from "react";

export default function RoomFilter({ medicines, value, onChange }) {
  const rooms = ["All", ...new Set(medicines.map((m) => m.room).filter(Boolean))];

  return (
    <div className="w-full sm:w-auto mb-4 sm:mb-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-64 px-4 py-2 rounded-lg border 
                   border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-darkCard 
                   text-gray-800 dark:text-gray-100 
                   focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-blue-500 
                   transition duration-200 ease-in-out"
      >
        {rooms.map((room) => (
          <option key={room} value={room}>
            {room}
          </option>
        ))}
      </select>
    </div>
  );
}
