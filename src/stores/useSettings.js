import create from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE, COMPONENTS } from "../constants";

const intialSettings = {
  dateType: "nepali",
  theme: "dark",
  temperatureUnit: "celcius",
  components: COMPONENTS,
  setTheme: () => {},
  setDateType: () => {},
  setTemperatureUnit: () => {},
};

export const useSettings = create(
  persist(
    (set, get) => ({
      config: intialSettings,
      setTheme: (theme) =>
        set((state) => ({ config: { ...state.config, theme } })),
      setDateType: (dateType) =>
        set((state) => ({ config: { ...state.config, dateType } })),
      setTemperatureUnit: (temperatureUnit) =>
        set((state) => ({ config: { ...state.config, temperatureUnit } })),
      toggleComponents: (callback) =>
        set((state) => ({
          config: { ...state.config, components: callback(state.config) },
        })),
    }),
    {
      name: STORAGE.SETTINGS,
      version: 1,
    }
  )
);
