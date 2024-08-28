// const { create } = require("zustand");
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiAxios } from "../utils/api";

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
      // "https://declaraciones.gomezpalacio.gob.mx/nominas/empleadosnombre/infraesctruturagobmxpalaciopeticioninsegura",
      const request = await ApiAxios("/login", {
         method: "POST",
         data,
      });
      // const request = await fetch(
      //    "https://backend.atc.gomezpalacio.gob.mx/api/gomezapp/login",
      //    {
      //       method: "POST",
      //       body: data,
      //    },
      // );
      console.log("🚀 ~ login ~ request:", request.data.data);
      return result;
   } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
   }
};

export const getAllPosts = async () => {
   try {
      const request = await fetch(
         "https://jsonplaceholder.typicode.com/posts/1",
      );
      const result = await request.json();
      return result;
   } catch (error) {
      console.log("🚀 ~ getAllPosts ~ error:", error);
   }
};
