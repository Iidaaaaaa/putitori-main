import { useState, useRef, useEffect } from "react";

const useTime = (initialHour = "00", initialMinute = "00") => {
  const [time, setTime] = useState({
    hour: initialHour,
    minute: initialMinute,
  });

  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  const generateHourOptions = () => {
    const options = Array.from({ length: 13 }, (_, i) =>
      i.toString().padStart(2, "0")
    );

    return ["時", ...options, "時"];
  };

  const generateMinuteOptions = () => {
    const options = Array.from({ length: 4 }, (_, i) =>
      (i * 15).toString().padStart(2, "0")
    );

    return ["分", ...options, "分"];
  };

  const handleSelect = (key, value) => {
    if (value === "時" || value === "分" || value === "") return;

    setTime((prev) => ({ ...prev, [key]: value }));
  };

  const highlightCenterItem = (ref, setTimeKey) => {
    if (!ref.current) return;

    const items = ref.current.children;
    const middle = ref.current.scrollTop + ref.current.clientHeight / 2;
    let closest = null;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemMiddle = item.offsetTop + item.offsetHeight / 2;
      const value = item.textContent.trim();

      if (value === "時" || value === "分" || value === "") continue;

      if (
        closest === null ||
        Math.abs(itemMiddle - middle) < Math.abs(closest.middle - middle)
      ) {
        closest = {
          element: item,
          value: value,
          middle: itemMiddle,
        };
      }
    }

    if (closest && closest.value !== undefined) {
      setTime((prev) => ({
        ...prev,
        [setTimeKey]: closest.value,
      }));
    }
  };

  useEffect(() => {
    if (hourRef.current) highlightCenterItem(hourRef, "hour");
    if (minuteRef.current) highlightCenterItem(minuteRef, "minute");
  }, []);

  return {
    time,
    hourRef,
    minuteRef,
    generateHourOptions,
    generateMinuteOptions,
    handleSelect,
    highlightCenterItem,
  };
};

export default useTime;
