import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapCenterUpdater = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position);
    }
  }, [position, map]);

  return null;
};

export default MapCenterUpdater;
