import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentCity } from "../store/slices/auth.slice.js";

const useGetCurrentCity = () => {
  const dispatch = useDispatch();
  const getCurrentCity = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { longitude, latitude } = position.coords;
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`,
      );
      dispatch(setCurrentCity(data?.features?.[0]?.properties?.city));
    });
  };
  useEffect(() => {
    getCurrentCity();
  }, []);
};

export default useGetCurrentCity;
