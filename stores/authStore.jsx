// const { create } = require("zustand");
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
   persist(
      (set) => ({
         token: null,
         setToken: (token) =>
            set((state) => ({
               token,
            })),
      }),
      {
         name: "auth",
      },
   ),
);
export default useAuthStore;
