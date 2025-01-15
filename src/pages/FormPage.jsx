"use client";

import React, { useState, Suspense } from "react";

const DynamicMap = React.lazy(() => import("../components/DynamicMap"));

const FormPage = () => {
  const [hours, setHours] = useState("");
  const [places, setPlaces] = useState(3); // デフォルトで3件に設定
  const [selectedGenres, setSelectedGenres] = useState(["", "", ""]); // 各件ごとのジャンル
  const [location, setLocation] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

        totalShops.push(data.results.shop[0]); // 各件ごとに1件だけ追加
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

  const handleGenreChange = (index, value) => {
    const updatedGenres = [...selectedGenres];
    updatedGenres[index] = value;
    setSelectedGenres(updatedGenres);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="border rounded-md shadow-lg p-4 bg-white">
        <h1 className="text-lg font-medium mb-4">居酒屋ハシゴプランを探す</h1>
        {!isMapVisible ? (
          <>
            <div className="space-y-4">
              <div>
                <label>ハシゴ時間（時間）</label>
                <input
                  type="number"
                  placeholder="ハシゴ時間（時間）"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label>ジャンルを選択</label>
                {[...Array(places)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <label>{index + 1}件目のジャンル</label>
                    <select
                      value={selectedGenres[index]}
                      onChange={(e) => handleGenreChange(index, e.target.value)}
                      className="border rounded-md p-2 w-full"
                    >
                      <option value="" disabled>
                        ジャンルを選択
                      </option>
                      <option value="G001">居酒屋</option>
                      <option value="G002">ダイニングバー・バー</option>
                      <option value="G003">創作料理</option>
                      <option value="G004">和食</option>
                      <option value="G005">洋食</option>
                      <option value="G006">イタリアン・フレンチ</option>
                      <option value="G007">中華</option>
                      <option value="G008">焼肉・韓国料理</option>
                      <option value="G009">アジア・エスニック料理</option>
                      <option value="G010">各国料理</option>
                      <option value="G011">カラオケ・パーティ</option>
                      <option value="G012">バー・カクテル</option>
                      <option value="G013">ラーメン</option>
                      <option value="G014">お好み焼き・もんじゃ</option>
                      <option value="G015">カフェ・スイーツ</option>
                      <option value="G016">その他</option>
                    </select>
                  </div>
                ))}
              </div>
              <div>
                <button
                  onClick={handleGetLocation}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  現在地を取得
                </button>
              </div>
              {location && (
                <p className="text-sm text-gray-500">
                  現在地: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              )}
            </div>
            <button
              className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? "検索中..." : "プランを探す"}
            </button>
          </>
        ) : (
          <Suspense fallback={<p>地図を読み込んでいます...</p>}>
            <DynamicMap location={location} shops={shops} />
          </Suspense>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default FormPage;
