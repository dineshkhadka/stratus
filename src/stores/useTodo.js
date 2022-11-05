import create from "zustand";
import { persist } from "zustand/middleware";

const TODO = "stratus-todo";

export const useTodo = create(
  persist(
    (set, get) => ({
      todo: [],
      setTodo: (todo) => set({ todo: [ ...todo ] }),
    }),
    {
      name: TODO,
    }
  )
);
