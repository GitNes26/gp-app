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

export const login = async (data) => {
   console.log("🚀 ~ login ~ data:", data);
   try {
      // const request = await fetch(import.meta.ENV.HOST_API);
      const request = await fetch(
         "https://backend.atc.gomezpalacio.gob.mx/api/gomezapp/login",
         {
            method: "POST",
            body: data,
         },
      );
      console.log("🚀 ~ login ~ request:", request);
      const result = await request.json();
      console.log("🚀 ~ login ~ result:", result);
      return result;
   } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
   }
};
