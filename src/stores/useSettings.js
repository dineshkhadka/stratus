import create from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE, COMPONENTS } from "../constants";

const intialSettings = {
  dateType: "nepali",
  theme: "dark",
  temperatureUnit: "celcius",
  components: COMPONENTS,
  backgroundCollections: [
    { id: "default", name: "Default", collectionId: null },
  ],
  selectedCollection: "default",
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
      addBackgroundCollection: (collection) =>
        set((state) => ({
          config: {
            ...state.config,
            backgroundCollections: [
              ...state.config.backgroundCollections,
              collection,
            ],
          },
        })),
      removeBackgroundCollection: (id) =>
        set((state) => ({
          config: {
            ...state.config,
            backgroundCollections: state.config.backgroundCollections.filter(
              (c) => c.id !== id
            ),
            selectedCollection:
              state.config.selectedCollection === id
                ? "default"
                : state.config.selectedCollection,
          },
        })),
      setSelectedCollection: (id) =>
        set((state) => ({
          config: { ...state.config, selectedCollection: id },
        })),
    }),
    {
      name: STORAGE.SETTINGS,
      version: 2,
    }
  )
);
