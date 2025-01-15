import React, { useState } from "react";

const TimeSelector = () => {
  const [selectedHour, setSelectedHour] = useState("00");
  const [selectedMinute, setSelectedMinute] = useState("00");

  const generateOptions = (range) => {
    return Array.from({ length: range }, (_, i) => {
      const value = i.toString().padStart(2, "0");
      return (
        <option key={value} value={value}>
          {value}
        </option>
      );
    });
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-md">
      {/* 時間セレクター */}
      <select
        value={selectedHour}
        onChange={(e) => setSelectedHour(e.target.value)}
        className="block w-16 p-2 text-lg border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      >
        {generateOptions(24)}
      </select>
      <span className="text-lg">:</span>
      {/* 分セレクター */}
      <select
        value={selectedMinute}
        onChange={(e) => setSelectedMinute(e.target.value)}
        className="block w-16 p-2 text-lg border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      >
        {generateOptions(60)}
      </select>
    </div>
  );
};

export default TimeSelector;
