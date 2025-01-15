import axios from "axios";

/**
 * OpenRouteService APIを使用してルートを取得する関数
 * @param {Object} params - パラメータオブジェクト
 * @param {Object} params.start - 開始地点の座標（{ lat, lng }形式）
 * @param {Object} params.end - 終了地点の座標（{ lat, lng }形式）
 * @param {string} params.transport - 移動手段（"foot" | "driving-car" | "cycling"など）
 * @returns {Promise<Object>} - 取得したルートデータ
 */
export const fetchORSRoute = async ({ start, end, transport }) => {
  const apiKey = import.meta.env.VITE_ORS_API_KEY;
  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/" + transport,
      {
        coordinates: [
          [start.lng, start.lat], // 開始地点の座標（[lng, lat]の順）
          [end.lng, end.lat], // 終了地点の座標
        ],
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("ORSレスポンス:", response.data); // デバッグ用
    return response.data.routes[0];
  } catch (error) {
    console.error("ORS API Error:", error);
    throw error;
  }
};

/**
 * OpenStreetMapのタイルURLを取得する関数
 * @returns {string} - タイルURL
 */
export const getMapTileUrl = () => {
  return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
};
