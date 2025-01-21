import React from "react";

const Selector = () => {
  return (
    <div className="flex items-center gap-2">
      {/* 時間セレクター */}
      <div className="relative w-20 h-32 overflow-y-scroll border rounded bg-gray-50">
        {generateOptions(24).map((option) => (
          <div
            key={option}
            className={`p-2 text-lg text-center cursor-pointer ${
              time.hour === option
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handleScrollSelect("hour", option)}
          >
            {option}
          </div>
        ))}
      </div>
      <span>:</span>
      {/* 分セレクター */}
      <div className="relative w-20 h-32 overflow-y-scroll border rounded bg-gray-50">
        {generateOptions(60).map((option) => (
          <div
            key={option}
            className={`p-2 text-lg text-center cursor-pointer ${
              time.minute === option
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handleScrollSelect("minute", option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selector;
