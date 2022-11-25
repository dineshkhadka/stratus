import create from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE } from "../constants";

export const useWorldClock = create(
  persist(
    (set, get) => ({
      worldClock: [],
      setWorldClock: (worldClock) => set({ worldClock: [...worldClock] }),
    }),
    {
      name: STORAGE.WORLD_CLOCK,
    }
  )
);
