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
   const setIsLoading = useGlobalStore.getState().setIsLoading;
   const setAuth = useAuthStore.getState().setAuth;
   const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;

   try {
      const req = await ApiUrl("/login", {
         method: "POST",
         data,
      });
      // console.log("🚀 ~ login ~ req:", req);
      if (!req.data.data) {
         setIsLoading(false);
         ToastAndroid.showWithGravity(
            "CREDENCIALES INCORRECTAS, VERIFICA TUS DATOS", //req.data,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
         );
         return;
      }
      const res = req.data.data;
      // console.log("🚀 ~ login ~ res:", res);
      if (!res.status) {
         setIsLoading(false);
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
      return res;
   } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
      setIsLoading(false);
      ToastAndroid.showWithGravity(
         "Datos Incorrectos o Cuenta no Registrada",
         ToastAndroid.LONG,
         ToastAndroid.BOTTOM,
      );
   }
};

export const logout = async () => {
   const setIsLoading = useGlobalStore.getState().setIsLoading;
   const auth = useAuthStore.getState().auth;
   const setAuth = useAuthStore.getState().setAuth;
   const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;

   try {
      await checkLoggedIn();
      // console.log("🚀 ~ logout ~ auth:", auth);
      let res = null;

      if (auth) {
         const req = await ApiUrl(`/logout/${auth.id}`, {
            method: "POST",
         });
         // console.log("🚀 ~ login ~ req:", req);
         res = req.data.data;
         if (!res.status) {
            setIsLoading(false);
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
      await setIsLoggedIn(false);
      await setAuth(null);
      return res;
   } catch (error) {
      console.log("🚀 ~ logout ~ error:", error);
      await setAuth(null);
      await setIsLoggedIn(false);
      setIsLoading(false);
      ToastAndroid.showWithGravity(
         "Error en el servidor",
         ToastAndroid.LONG,
         ToastAndroid.BOTTOM,
      );
      return;
   }
};

export const signup = async (data) => {
   const setIsLoading = useGlobalStore.getState().setIsLoading;
   const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;

   try {
      const req = await ApiUrl("/users", {
         method: "POST",
         data,
      });
      // console.log("🚀 ~ signup ~ req:", req);
      if (!req.data.data) {
         setIsLoading(false);
         ToastAndroid.showWithGravity(
            "ERROR INESPERADO", //req.data,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
         );
         return;
      }
      const res = req.data.data;
      // console.log("🚀 ~ signup ~ res:", res);
      ToastAndroid.showWithGravity(
         res.alert_text,
         ToastAndroid.LONG,
         ToastAndroid.BOTTOM,
      );
      // console.log("🚀 ~ signup ~ res:", res);

      await setIsLoggedIn(false);
      return res;
   } catch (error) {
      console.log("🚀 ~ signup ~ error:", error);
      setIsLoading(false);
      ToastAndroid.showWithGravity(
         error,
         ToastAndroid.LONG,
         ToastAndroid.BOTTOM,
      );
   }
};

export const getProfile = async () => {
   const auth = useAuthStore.getState().auth;

   try {
      if (auth) {
         const req = await ApiUrl(`/users/${auth.id}`, {
            method: "GET",
         });
         // return console.log("🚀 ~ getProfile ~ req:", req.data.res);
         const res = req.data.data;
         if (res.status && res.result?.id) return true;
      }
      return false;
   } catch (error) {
      console.log("🚀 ~ getProfile ~ error:", error);
      return false;
   }
};

export const checkLoggedIn = async () => {
   const auth = useAuthStore.getState().auth;
   const setAuth = useAuthStore.getState().setAuth;
   const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;
   const isLoggedIn = useAuthStore.getState().isLoggedIn;

   // console.log("🚀 ~ checkLoggedIn ~ auth:", auth);

   if (!auth) {
      console.log("checkLoggedIn ~ no tengo auth");
      await setAuth(null);
      await setIsLoggedIn(false);
   } else {
      console.log("checkLoggedIn ~ SI tengo auth");
      const authValidate = await getProfile();
      if (!authValidate) {
         console.log("checkLoggedIn ~ pero no ya no es valido");
         await setAuth(null);
         await setIsLoggedIn(false);
      } else {
         if (auth.token) {
            ApiUrl.defaults.headers.common["Authorization"] =
               `Bearer ${auth.token}`;
            ApiUrlFiles.defaults.headers.common["Authorization"] =
               `Bearer ${auth.token}`;
         }
         setIsLoggedIn(true);
      }
   }
   if (!auth && !isLoggedIn) {
      console.log("checkLoggedIn ~ DE PLANO NO TENGO SESIÓN");
      // return <Redirect href={"(auth)"} />;
      router.canDismiss() ? router.dismissAll() : router.replace("(auth)");
   }
};
