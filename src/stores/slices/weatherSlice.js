import create from "zustand";
import { persist } from "zustand/middleware";

const WEATHER = "stratus-weather";

export const createWeatherSlice = create(
  persist(
    (set, get) => ({
      weatherDetails: [],
      setWeatherDetails: (weatherDetails) => set({ weatherDetails }),
    }),
    {
      name: WEATHER,
    }
  )
);