import create from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE } from "../constants";

export const useStore = create(
  persist(
    (set, get) => ({
      weatherDetails: [],
      placeName: [],
      backgroundImage: [],
      currentQuote: [],
      setWeatherDetails: (weatherDetails) =>
        set({ weatherDetails: { ...weatherDetails } }),
      setPlaceName: (placeName) => set({ placeName: { ...placeName } }),
      setBackgroundImage: (backgroundImage) =>
        set({ backgroundImage: { ...backgroundImage } }),
      setcurrentQuote: (currentQuote) =>
        set({ currentQuote: { ...currentQuote } }),
    }),
    {
      name: STORAGE.WIDGETS,
    }
  )
);
