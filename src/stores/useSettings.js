import create from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE, COMPONENTS } from "../constants";

const intialSettings = {
  dateType: "nepali",
  theme: "dark",
  components: COMPONENTS,
  setTheme: () => {},
  setDateType: () => {},
};

export const useSettings = create(
  persist(
    (set, get) => ({
      config: intialSettings,
      setTheme: (theme) =>
        set((state) => ({ config: { ...state.config, theme } })),
      setDateType: (dateType) =>
        set((state) => ({ config: { ...state.config, dateType } })),
      toggleComponents: (callback) =>
        set((state) => ({
          config: { ...state.config, components: callback(state.config) },
        })),
    }),
    {
      name: STORAGE.SETTINGS,
    }
  )
);
