import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiUrl } from "../utils/api";

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
   try {
      const request = await ApiUrl("/login", {
         method: "POST",
         data,
      });
      // console.log("🚀 ~ login ~ request:", request.data.result);
      const result = request.data.data;
      console.log("🚀 ~ login ~ result:", result);
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
