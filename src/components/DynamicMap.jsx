import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DynamicMap = ({ location, shops, route }) => {
  const mapRef = useRef(null);
  const routeLayerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([location.lat, location.lng], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // 既存のマーカーをクリア
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // 現在地マーカーを追加
    L.marker([location.lat, location.lng])
      .addTo(mapRef.current)
      .bindPopup("現在地")
      .openPopup();

    // 店舗マーカーを追加
    shops.forEach((shop, index) => {
      L.marker([shop.lat, shop.lng])
        .addTo(mapRef.current)
        .bindPopup(`${index + 1}件目: ${shop.name}`);
    });

    // ルート描画
    if (route && route.geometry && route.geometry.coordinates.length > 0) {
      const coordinates = route.geometry.coordinates.map((coord) => [
        coord[1], // 緯度
        coord[0], // 経度
      ]);

      if (routeLayerRef.current) {
        mapRef.current.removeLayer(routeLayerRef.current);
      }

      routeLayerRef.current = L.polyline(coordinates, { color: "blue" }).addTo(
        mapRef.current
      );

      mapRef.current.fitBounds(routeLayerRef.current.getBounds());
    }
  }, [location, shops, route]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default DynamicMap;
