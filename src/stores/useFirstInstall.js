import create from "zustand";
import { persist } from "zustand/middleware";
import * as constants from "../constants";

export const useFirstInstall = create(
  persist(
    (set, get) => ({
      hasInstalled: false,
      setHasInstalled: (hasInstalled) => set({ hasInstalled: hasInstalled }),
    }),
    {
      name: constants.FIRST_INSTALL,
    }
  )
);
