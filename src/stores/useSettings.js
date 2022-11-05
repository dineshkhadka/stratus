import create from "zustand";
import { persist } from "zustand/middleware";

const SETTINGS = "stratus-settings";
const intialSettings = {
  dateType: "nepali",
  theme: "dark",
  setTheme: () => {},
  setDateType: () => {},
  components: {
    date: true,
    time: true,
    quote: true,
    weather: true,
    weather_future: true,
    todo: true,
    credit: true,
    timezone: true,
  },
};

export const useSettings = create(
  persist(
    (set, get) => ({
      config: intialSettings,
      setTheme: (theme) => set(state => ({ config: { ...state.config, theme } })),
      setDateType: (dateType) => set(state => ({ config: { ...state.config, dateType } })),
      toggleComponents: (callback) => set(state => ({ config: { ...state.config, components: callback(state.config) } }))
    }),
    {
      name: SETTINGS,
    }
  )
);