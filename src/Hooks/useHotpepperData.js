import { useState, useEffect } from "react";
import { fetchHotpepperData } from "@services/HotpepperAPI";

const useHotpepperData = (location, range = 3, count = 5) => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!location) return;

    const fetchData = async () => {
      try {
        const data = await fetchHotpepperData({
          lat: location.latitude,
          lng: location.longitude,
          range: range, // 3km以内
          count: count, // 最大5件
        });
        setShops(data || []);
      } catch (err) {
        console.error(err);
        setError("店舗情報の取得に失敗しました。");
      }
    };

    fetchData();
  }, [location, range, count]);

  return { shops, error };
};

export default useHotpepperData;
