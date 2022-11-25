import create from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE } from "../constants";

export const useFirstInstall = create(
  persist(
    (set, get) => ({
      hasInstalled: false,
      setHasInstalled: (hasInstalled) => set({ hasInstalled: hasInstalled }),
    }),
    {
      name: STORAGE.FIRST_INSTALL,
    }
  )
);
