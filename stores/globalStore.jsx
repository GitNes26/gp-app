// const { create } = require("zustand");
import { create } from "zustand";
// import { persist } from "zustand/middleware";

const useGlobalStore = create((set) => ({
   loading: true,
   setLoading: (loading) =>
      set((state) => ({
         loading,
      })),
}));
export default useGlobalStore;
