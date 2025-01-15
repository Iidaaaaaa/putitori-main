import { useState } from "react";
import { fetchHotpepperData } from "@services/HotpepperAPI";
import { fetchORSRoute } from "@services/Openstreetmap";

const useRoutePlanner = () => {
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");

  const planRoute = async ({ time, genres, location }) => {
    try {
      // 1件目、2件目、3件目の店舗情報を取得
      const shops = [];
      for (const genre of genres) {
        const result = await fetchHotpepperData({
          lat: location.lat,
          lng: location.lng,
          range: 3,
          genre: genre,
          count: 1,
        });
        if (result.length === 0) {
          setError("条件に合う店舗が見つかりませんでした。");
          return;
        }
        shops.push(result[0]);
      }

      // OpenRouteService APIでルートを計算
      const orsRoute = await fetchORSRoute({
        start: { lat: location.lat, lng: location.lng },
        waypoints: shops.map((shop) => ({
          lat: shop.lat,
          lng: shop.lng,
        })),
        transport: "foot", // 徒歩でのルートを指定
      });

      console.log("取得したルート情報:", orsRoute);

      setRoute(orsRoute);
    } catch (err) {
      console.error("ルート計画エラー:", err);
      setError("ルートの作成に失敗しました。");
    }
  };

  return { planRoute, route, error };
};

export default useRoutePlanner;
