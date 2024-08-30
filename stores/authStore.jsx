import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ApiUrl } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const useAuthStore = create(
   persist(
      (set) => ({
         auth: null,
         setAuth: (auth) => set({ auth }),
         removeAuth: () => set({ auth: null }),
      }),
      {
         name: "auth",
         storage: createJSONStorage(() => AsyncStorage),
      },
   ),

   // (set) => ({
   //    auth: null,
   //    setAuth: async(value) =>
   //       set( (state) => {
   //          ({ value });
   //          await AsyncStorage.setItem("auth", JSON.stringify(value));
   //       }),
   //    removeAuth: () =>
   //       set(async (state) => {
   //          console.log("🚀 ~ removeAuth ~ set ~ state:", state);
   //          await AsyncStorage.removeItem("auth");
   //       }),
   // }),

   // persist(
   //    (set) => ({
   //       auth: null,
   //       setAuth: (value) => {
   //          // console.log("🚀 ~ value:", value);
   //          set((state) => ({
   //             auth: value,
   //          }));
   //       },
   //       removeAuth: async () => {
   //          set((state) => ({
   //             auth: null,
   //          }));
   //          await AsyncStorage.clear();
   //          await AsyncStorage.removeItem("auth");
   //       },
   //    }),
   //    {
   //       name: "auth",
   //       storage: createJSONStorage(() => AsyncStorage),
   //    },
   // ),
);
export default useAuthStore;

export const login = async (data) => {
   // const setAuth = useAuthStore((state) => state.setAuth);
   const auth = useAuthStore.getState().auth;
   const setAuth = useAuthStore.getState().setAuth;

   try {
      const req = await ApiUrl("/login", {
         method: "POST",
         data,
      });
      // console.log("🚀 ~ login ~ req:", req.data.res);
      const res = req.data.data;
      // console.log("🚀 ~ login ~ res:", res);
      await setAuth(res.result);
   } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
   }
};

export const logout = async () => {
   console.log("🚀 ~ FUNCION logout ");
   const removeAuth = useAuthStore.getState().removeAuth;

   try {
      // const req = await ApiUrl("/logout", {
      //    method: "POST",
      //    data,
      // });
      // // console.log("🚀 ~ login ~ req:", req.data.res);
      // const res = req.data.data;
      // console.log("🚀 ~ logout ~ res:", res);
      await removeAuth();
      router.canGoBack();
   } catch (error) {
      console.log("🚀 ~ logout ~ error:", error);
   }
};
