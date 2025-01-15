import { useState } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    });
  };

  return { location, getLocation };
};

export default useGeolocation;
