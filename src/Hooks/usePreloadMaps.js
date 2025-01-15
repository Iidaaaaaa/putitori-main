import { useState } from "react";

const usePreloadMaps = () => {
  const [tileUrl, setTileUrl] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  const getTileUrlForZoom = (zoomLevel) => {
    if (zoomLevel < 10) {
      return "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png";
      ル;
    } else {
      return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  const updateTileUrl = (zoomLevel) => {
    setTileUrl(getTileUrlForZoom(zoomLevel));
  };

  return { tileUrl, updateTileUrl };
};

export default usePreloadMaps;
