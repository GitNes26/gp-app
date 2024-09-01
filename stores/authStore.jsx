import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ApiUrl, ApiUrlFiles } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { ToastAndroid } from "react-native";
import useGlobalStore from "./globalStore";

const useAuthStore = create(
   persist(
      (set) => ({
         auth: null,
         isLoggedIn: false,
         setAuth: (auth) => set((state) => ({ auth })),
         // set((state) => ({ auth: state.auth !== auth ? auth : state.auth })),
         // removeAuth: () => set((state) => ({ auth: null })),
         setIsLoggedIn: (isLoggedIn) => set((state) => ({ isLoggedIn })),
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
   const setLoading = useGlobalStore.getState().setLoading;

   try {
      const req = await ApiUrl("/login", {
         method: "POST",
         data,
      });
      // console.log("🚀 ~ login ~ req:", req);
      if (!req.data.data) {
         setLoading(false);
         ToastAndroid.showWithGravity(
            "CREDENCIALES INCORRECTAS, VERIFICA TUS DATOS", //req.data,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
         );
         return;
      }
      const res = req.data.data;
      if (!res.status) {
         setLoading(false);
         ToastAndroid.showWithGravity(
            res.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
         );
         return;
      }
      // console.log("🚀 ~ login ~ res:", res);

      const token = res.result.token;
      ApiUrl.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      ApiUrlFiles.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await setAuth(res.result);
      // router.push("(main)");
   } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
      setLoading(false);
      ToastAndroid.showWithGravity(
         "Datos Incorrectos o Cuenta no Registrada",
         ToastAndroid.LONG,
         ToastAndroid.BOTTOM,
      );
   }
};

export const logout = async () => {
   const auth = useAuthStore.getState().auth;
   const setAuth = useAuthStore.getState().setAuth;

   try {
      await checkLoggedIn();

      const req = await ApiUrl(`/logout/${auth.id}`, {
         method: "POST",
      });
      // console.log("🚀 ~ login ~ req:", req);
      const res = req.data.data;
      if (!res.status) {
         setLoading(false);
         ToastAndroid.showWithGravity(
            res.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
         );
         return;
      }
      ApiUrl.defaults.headers.common["Authorization"] = null;
      ApiUrlFiles.defaults.headers.common["Authorization"] = null;
      // console.log("Todas las cabeceras:", ApiUrl.defaults.headers);
      await setAuth(null);
      // await removeAuth();
      // console.log("🚀 ~ logout ~ res:", res);
      // await AsyncStorage.getAllKeys();
      // router.canDismiss() && router.dismissAll();
   } catch (error) {
      console.log("🚀 ~ logout ~ error:", error);
      setLoading(false);
      ToastAndroid.showWithGravity(
         "Error en el servidor",
         ToastAndroid.LONG,
         ToastAndroid.BOTTOM,
      );
      return;
   }
};

export const signup = async (data) => {
   // const auth = useAuthStore.getState().auth;
   // const setAuth = useAuthStore.getState().setAuth;

   try {
      // const req = await ApiUrl("/login", {
      //    method: "POST",
      //    data,
      // });
      // // console.log("🚀 ~ login ~ req:", req.data.res);
      // const res = req.data.data;
      // ApiUrl.defaults.headers.common["Authorization"] =
      //    `Bearer ${data.result.token}`;
      // ApiUrlFiles.defaults.headers.common["Authorization"] =
      //    `Bearer ${data.result.token}`;
      // // console.log("🚀 ~ login ~ res:", res);
      // await setAuth(data.result);
      // router.push("(main)");
   } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
   }
};

export const checkLoggedIn = async () => {
   const auth = useAuthStore.getState().auth;
   if (auth.token && !ApiUrl.defaults.headers.common["Authorization"]) {
      ApiUrl.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
      ApiUrlFiles.defaults.headers.common["Authorization"] =
         `Bearer ${auth.token}`;
   }
};

// export const isLoggedIn = () => {
// const auth = useAuthStore.getState().auth;
// const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;
// if (auth) {
//    console.log("toy logeado :)");
//    ApiUrl.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
//    ApiUrlFiles.defaults.headers.common["Authorization"] =
//       `Bearer ${auth.token}`;
//    setIsLoggedIn(true);
//    <Redirect href="(main)" />;
// } else {
//    console.log("NO toy logeado :c");
//    ApiUrl.defaults.headers.common["Authorization"] = null;
//    ApiUrlFiles.defaults.headers.common["Authorization"] = null;
//    setIsLoggedIn(false);
//    <Redirect href="(auth)" />;
// }
// };
