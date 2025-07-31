"use client"

import { useEffect, useState } from "react"

const LOCATION_STORAGE_KEY = "user_location";
const LOCATION_EXPIRY_DAYS = 20;


// const getStoredLocation = () => {
//   const storedData = localStorage.getItem(LOCATION_STORAGE_KEY);
//   if (!storedData) return null;

//   const parsedData = JSON.parse(storedData);
//  const expiriyTime = LOCATION_EXPIRY_DAYS * 24 * 60 * 60 * 1000; // 20 days in milliseconds
//   const isExpired = Date.now()- parsedData.timestamp > expiriyTime;

//   return isExpired ? null : parsedData;

// }

// const useLocationTracking = () => {
//   const [location, setLocation] = useState<{country: string; city: string} | null>(getStoredLocation());

//   useEffect(() => {
//    if(location) return;

//    fetch("http://ip-api.com/json/").then((res) => res.json()).then((data) => {
//     const newLocation = {
//       country: data?.country,
//         city: data?.city,
//         timestamp: Date.now(),
//    };

//     localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
//     setLocation(newLocation);   

// }).catch((error) => console.log("Error fetching location:", error));
//   }, []);

//   return location;
// };


const useLocationTracking = () => {
  const [location, setLocation] = useState<{ country: string; city: string } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getStoredLocation = () => {
      try {
        const storedData = localStorage.getItem(LOCATION_STORAGE_KEY);
        if (!storedData) return null;

        const parsedData = JSON.parse(storedData);
        const expiryTime = LOCATION_EXPIRY_DAYS * 24 * 60 * 60 * 1000; // 20 days
        const isExpired = Date.now() - parsedData.timestamp > expiryTime;

        return isExpired ? null : parsedData;
      } catch {
        return null;
      }
    };

    const existingLocation = getStoredLocation();
    if (existingLocation) {
      setLocation(existingLocation);
      return;
    }

    fetch("https://ip-api.com/json/")
      .then((res) => res.json())
      .then((data) => {
        const newLocation = {
          country: data?.country,
          city: data?.city,
          timestamp: Date.now(),
        };

        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
        setLocation(newLocation);
      })
      .catch((err) => {
        console.error("Error fetching location:", err);
      });
  }, []);

  return location;
};

export default useLocationTracking;