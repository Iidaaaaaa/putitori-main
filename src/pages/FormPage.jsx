"use client";

import React, { useState, Suspense } from "react";
import Getgpsbtn from "@components/Getgpsbtn";
import FormGenre from "@components/FormGenre";
import FormTime from "@components/FormTime";
import Clock from "@assets/Clock";
import PlanForm from "@components/PlanForm";
import useModal from "@hooks/useModal";
import Genre from "@assets/Genre";

const DynamicMap = React.lazy(() => import("@components/DynamicMap"));

const FormPage = () => {
  const [hours, setHours] = useState("");
  const [places, setPlaces] = useState(3);
  const [genreNames, setGenreNames] = useState(Array(3).fill(""));
  const [selectedGenres, setSelectedGenres] = useState(Array(3).fill(""));
  const [location, setLocation] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalContent, setModalContent] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const handleOpenModal = (content) => {
    setModalContent(content);
    openModal();
  };

  const handleTimeSelect = (hour, minute) => {
    const formattedTime = `${hour}:${minute}`;
    setSelectedTime(formattedTime);
    setHours(formattedTime);
    closeModal();
    console.log('Selected Time:', formattedTime);
  };

  React.useEffect(() => {
    console.log('Current Time:', hours);
    console.log('Selected Genres:', selectedGenres);
    console.log('Location:', location);
    console.log('Places:', places);
  }, [hours, selectedGenres, location, places]);

  return (
    <div className="h-full max-w-md p-4 mx-auto">
      <div className="p-4 bg-white border rounded-md shadow-lg">
        <h1 className="mb-4 text-lg font-medium">居酒屋ハシゴプランを探す</h1>
        {!isMapVisible ? (
          <>
            <div className="space-y-4">
              <div>
                <PlanForm
                  text={`空き時間 ${selectedTime}`}
                  Icon={<Clock color="#000" width="18" height="18" />}
                  onClick={() =>
                    handleOpenModal(<FormTime onSelect={handleTimeSelect} />)
                  }
                />
              </div>
              {[...Array(places)].map((_, index) => (
                <PlanForm
                  key={index}
                  text={`${index + 1}件目のジャンル: ${genreNames[index] || "選択してください"}`}
                  Icon={<Genre />}
                  onClick={() =>
                    handleOpenModal(
                      <FormGenre
                        onSelect={(value, name) => {
                          const newNames = [...genreNames];
                          newNames[index] = name;
                          setGenreNames(newNames);

                          const newValues = [...selectedGenres];
                          newValues[index] = value;
                          setSelectedGenres(newValues);

                          closeModal();
                        }}
                      />
                    )
                  }
                />
              ))}
            </div>
            <Getgpsbtn
              hours={hours}
              location={location}
              selectedGenres={selectedGenres}
              places={places}
              setLocation={setLocation}
              setError={setError}
              setShops={setShops}
              setIsMapVisible={setIsMapVisible}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </>
        ) : (
          <Suspense fallback={<p>地図を読み込んでいます...</p>}>
            <DynamicMap location={location} shops={shops} />
          </Suspense>
        )}
        {error && <div className="mt-2 text-red-500">{error}</div>}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg">
            {modalContent}
          </div>
        </div>
      )}
      <h2 className="mb-4 text-xl font-bold">店舗情報一覧</h2>
      {shops.length > 0 ? (
        <ul>
          {shops.map((shop, index) => (
            <li key={index} className="mb-2">
              <strong>{index + 1}件目:</strong> {shop.name}（ジャンル: {shop.genre.name}）
            </li>
          ))}
        </ul>
      ) : (
        <p>店舗情報が見つかりませんでした。</p>
      )}
    </div>
  );
};

export default FormPage;
