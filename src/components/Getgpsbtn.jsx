import React from "react";
import Gps from "@assets/Gps";

const Getgpsbtn = ({
  hours,
  location,
  selectedGenres,
  places,
  setLocation,
  setError,
  setShops,
  setIsMapVisible,
  isLoading,
  setIsLoading
}) => {
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("位置情報の取得に失敗しました:", error);
          alert("位置情報の取得に失敗しました。設定を確認してください。");
        }
      );
    } else {
      alert("お使いのブラウザは位置情報をサポートしていません。");
    }
  };

  const handleSearch = async () => {
    if (!hours || !location || selectedGenres.some((genre) => genre === "")) {
      alert("ハシゴ時間、ジャンル、現在地を入力してください。");
      return;
    }

    setIsLoading(true);
    setError("");
    setShops([]);

    try {
      let totalShops = [];
      for (let i = 0; i < places; i++) {
        const genre = selectedGenres[i];
        const fullUrl = `http://localhost:3001/api/hotpepper?lat=${location.lat}&lng=${location.lng}&range=3&genre=${genre}&count=1`;

        console.log(`リクエストURL（${i + 1}件目）:`, fullUrl);

        const response = await fetch(fullUrl);
        const data = await response.json();

        if (data.results.shop.length === 0) {
          setError(`条件に合う${i + 1}件目の店舗が見つかりませんでした。`);
          return;
        }

        totalShops.push(data.results.shop[0]);
      }

      setShops(totalShops);
      setIsMapVisible(true);
    } catch (err) {
      console.error("検索エラー:", err);
      setError("検索中にエラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className="inline-block p-[9px] bg-[#999999] rounded-2xl cursor-pointer"
        onClick={handleGetLocation}
      >
        <div className="flex items-center">
          <Gps width="16" height="16" />
          <p className="ml-2 text-xs">現在地を取得</p>
        </div>
      </div>

      {location && (
        <p className="text-sm text-gray-500">
          現在地: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </p>
      )}

      <button
        className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? "検索中..." : "プランを探す"}
      </button>
    </div>
  );
};

export default Getgpsbtn;
