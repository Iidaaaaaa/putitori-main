import React, { useState } from "react";
import Map from "@pages/Map";
import FormPage from "@pages/FormPage";

const App = () => {
  const [isMapVisible, setIsMapVisible] = useState(false); // マップ表示状態
  const [formData, setFormData] = useState(null); // フォームデータ（空き時間、ジャンルなど）

  const handleSearch = (data) => {
    setFormData(data); // フォームデータを保存
    setIsMapVisible(true); // マップを表示
  };

  return (
    <div>
      {!isMapVisible ? (
        <FormPage onSearch={handleSearch} />
      ) : (
        <Map formData={formData} />
      )}
    </div>
  );
};

export default App;
