// const { create } = require("zustand");
import { create } from "zustand";
// import { persist } from "zustand/middleware";

const useGlobalStore = create((set) => ({
   isLoading: false,
   setIsLoading: (isLoading) => set((state) => ({ isLoading })),
}));
export default useGlobalStore;
