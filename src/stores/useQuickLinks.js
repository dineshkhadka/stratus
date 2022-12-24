import create from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE } from "../constants";

export const useQuickLinks = create(
  persist(
    (set, get) => ({
      quickLinks: [],
      updateQuickLinks: (id, updates) => {
        set((state) => {
          const _todos = state.quickLinks.map((quickLink) => {
            if (quickLink.id === id) {
              return { ...quickLink, ...updates };
            }
            return quickLink;
          });
          return { quickLinks: _todos };
        });
      },
      setQuickLinks: (quickLinks) => set({ quickLinks: [...quickLinks] }),
      moveQuickLinks: (index, direction) => {
        set((state) => {
          const _arr = [...state.quickLinks];
          const tmp = _arr[index];
          if (direction === "up" && index !== 0) {
            _arr[index] = _arr[index - 1];
            _arr[index - 1] = tmp;
          } else if (direction === "down" && index !== _arr.length - 1) {
            _arr[index] = _arr[index + 1];
            _arr[index + 1] = tmp;
          }
          return { quickLinks: _arr };
        });
      },
    }),
    {
      name: STORAGE.QUICK_LINKS,
    }
  )
);
