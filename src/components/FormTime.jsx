import React from "react";
import useTime from "@hooks/useTime";

const FormTime = ({ onSelect ,onTimeSelect}) => {
  const {
    time,
    hourRef,
    minuteRef,
    generateHourOptions,
    generateMinuteOptions,
    handleSelect,
    highlightCenterItem,
  } = useTime();

  const handleConfirm = () => {
    onSelect(time.hour, time.minute);
  };

  const handleTimeSelect = () => {
    const selectedTime = `${time.hour}:${time.minute}`;
    onTimeSelect(selectedTime);  // 親コンポーネントに選択された時間を渡す
  };


  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center gap-4">
        <div
          ref={hourRef}
          className="relative w-20 h-32 overflow-y-auto border rounded bg-gray-50"
          onScroll={() => highlightCenterItem(hourRef, "hour")}
        >
          {generateHourOptions().map((hour, index) => (
            <div
              key={index}
              className={`p-2 text-lg text-center cursor-pointer ${
                time.hour === hour
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("hour", hour)}
            >
              {hour}
            </div>
          ))}
        </div>
        <span>:</span>
        <div
          ref={minuteRef}
          className="relative w-20 h-32 overflow-y-auto border rounded bg-gray-50"
          onScroll={() => highlightCenterItem(minuteRef, "minute")}
        >
          {generateMinuteOptions().map((minute, index) => (
            <div
              key={index}
              className={`p-2 text-lg text-center cursor-pointer ${
                time.minute === minute
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("minute", minute)}
            >
              {minute}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleConfirm}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
      >
        決定
      </button>
    </div>
  );
};

export default FormTime;
