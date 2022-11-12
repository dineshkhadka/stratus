import create from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE } from "../constants";

export const useTodo = create(
  persist(
    (set, get) => ({
      todo: [],
      setTodo: (todo) => set({ todo: [...todo] }),
    }),
    {
      name: STORAGE.TODO,
    }
  )
);
