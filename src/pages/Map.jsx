import React from "react";
// Componentsのインポート
import Openstreetmap from "@components/Openstreetmap";
// Hooksのインポート
import useGeolocation from "@hooks/useGeolocation";

const Map = () => {
  const { location } = useGeolocation();

  return (
    <div>
      <Openstreetmap location={location} />
    </div>
  );
};

export default Map;
