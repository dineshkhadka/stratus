import create from "zustand";
import { persist } from "zustand/middleware";

const PLACE = "stratus-place";

export const createPlaceSlice = create(
  persist(
    (set, get) => ({
      placeName: '',
      setPlaceName: (placeName) => set({ placeName }),
    }),
    {
      name: PLACE,
    }
  )
);