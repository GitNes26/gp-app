import { create } from "zustand";

const useGlobalStore = create((set) => ({
   isLoading: false,
   bgTransparent: false,
   setIsLoading: (isLoading) => set((state) => ({ isLoading })),
   setBgTransparent: (bgTransparent) => set((state) => ({ bgTransparent }))
}));
export default useGlobalStore;
