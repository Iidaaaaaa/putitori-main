import React from "react";

const FormGenre = ({ onSelect }) => {
  const genres = [
    { value: "G001", name: "居酒屋" },
    { value: "G002", name: "ダイニングバー・バー" },
    { value: "G003", name: "創作料理" },
    { value: "G004", name: "和食" },
    { value: "G005", name: "洋食" },
    { value: "G006", name: "イタリアン・フレンチ" },
    { value: "G007", name: "中華" },
    { value: "G008", name: "焼肉・韓国料理" },
    { value: "G009", name: "アジア・エスニック料理" },
    { value: "G010", name: "各国料理" },
    { value: "G011", name: "カラオケ・パーティ" },
    { value: "G012", name: "バー・カクテル" },
    { value: "G013", name: "ラーメン" },
    { value: "G014", name: "お好み焼き・もんじゃ" },
    { value: "G015", name: "カフェ・スイーツ" },
    { value: "G016", name: "その他" }
  ];



  return (
    <div className="p-4">
      {genres.map((genre) => (
        <div
          key={genre.value}
          className="p-3 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(genre.value,genre.name )}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};
export default FormGenre;
