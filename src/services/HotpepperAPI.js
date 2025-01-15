import axios from "axios";

export const fetchHotpepperData = async (query) => {
  const apiKey = import.meta.env.VITE_HOTPEPPER_API_KEY;
  try {
    const response = await axios.get(
      "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/",
      {
        params: {
          key: apiKey,
          format: "json",
          ...query, // 緯度・経度・ジャンル・範囲・件数
        },
      }
    );
    return response.data.results.shop || [];
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
