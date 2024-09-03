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
         setIsLoggedIn: (isLoggedIn) => set((state) => ({ isLoggedIn })),
      }),
      {
         name: "auth",
         storage: createJSONStorage(() => AsyncStorage),
      },
   ),
);
export default useAuthStore;

export const login = async (data) => {
   // const setAuth = useAuthStore((state) => state.setAuth);
   const setLoading = useGlobalStore.getState().setLoading;
   const auth = useAuthStore.getState().auth;
   const setAuth = useAuthStore.getState().setAuth;
   const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;

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
      await setIsLoggedIn(true);
      if (token) router.push("(main)");
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
   const setLoading = useGlobalStore.getState().setLoading;
   const auth = useAuthStore.getState().auth;
   const setAuth = useAuthStore.getState().setAuth;
   const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;

   try {
      await checkLoggedIn();

      if (auth) {
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
      }
      ApiUrl.defaults.headers.common["Authorization"] = null;
      ApiUrlFiles.defaults.headers.common["Authorization"] = null;
      // console.log("Todas las cabeceras:", ApiUrl.defaults.headers);
      await setAuth(null);
      await setIsLoggedIn(false);
      router.canDismiss() && router.dismiss();
      router.replace("/(auth)");
      // return <Redirect href={"(auth)"} />;
      console.log("cehcado2");
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
      // // console.log("🚀 ~ login ~ res:", res);
      // await setAuth(data.result);
      // router.push("(main)");
   } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
   }
};

export const checkLoggedIn = async () => {
   const auth = useAuthStore.getState().auth;
   const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;
   const isLoggedIn = useAuthStore.getState().isLoggedIn;

   // console.log("🚀 ~ checkLoggedIn ~ auth:", auth);
   let loggedIn = isLoggedIn;

   if (!auth) {
      console.log("checkLoggedIn ~ no estoy logeado");
      loggedIn = false;
      await setIsLoggedIn(loggedIn);
      // router.replace("(auth)");
      // return;
   } else {
      loggedIn = true;
      if (auth.token && !ApiUrl.defaults.headers.common["Authorization"]) {
         ApiUrl.defaults.headers.common["Authorization"] =
            `Bearer ${auth.token}`;
         ApiUrlFiles.defaults.headers.common["Authorization"] =
            `Bearer ${auth.token}`;
      }
      setIsLoggedIn(loggedIn);
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
