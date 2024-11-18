import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ApiUrl, ApiUrlFiles } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { Alert, Platform, ToastAndroid } from "react-native";
import useGlobalStore from "./globalStore";

const useAuthStore = create(
   persist(
      (set) => ({
         auth: null,
         isLoggedIn: false,
         setAuth: (auth) => set((state) => ({ auth })),
         // set((state) => ({ auth: state.auth !== auth ? auth : state.auth })),
         setIsLoggedIn: (isLoggedIn) => set((state) => ({ isLoggedIn }))
      }),
      {
         name: "auth",
         storage: createJSONStorage(() => AsyncStorage)
      }
   )
);
export default useAuthStore;

export const login = async (data) => {
   const setIsLoading = useGlobalStore.getState().setIsLoading;
   const setAuth = useAuthStore.getState().setAuth;
   const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;

   try {
      const req = await ApiUrl("/login", {
         method: "POST",
         data
      });
      // console.log("🚀 ~ login ~ req:", req);
      if (!req.data.data) {
         setIsLoading(false);
         if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
               "CREDENCIALES INCORRECTAS, VERIFICA TUS DATOS", //req.data,
               ToastAndroid.LONG,
               ToastAndroid.BOTTOM
            );
            return;
         } else {
            Alert.alert("CREDENCIALES INCORRECTAS, VERIFICA TUS DATOS");
            return;
         }

      }
      const res = req.data.data;
      // console.log("🚀 ~ login ~ res:", res);
      if (!res.status) {
         setIsLoading(false);
         if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(res.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
         } else {
            Alert.alert(res.message);
         }

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
      if (Platform.OS === 'android') {
         ToastAndroid.showWithGravity("Datos Incorrectos o Cuenta no Registrada", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      } else {
         Alert.alert("Datos Incorrectos o Cuenta no Registrada");
      }

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
            method: "POST"
         });
         // console.log("🚀 ~ login ~ req:", req);
         res = req.data.data;
         if (!res.status) {
            setIsLoading(false);
            if (Platform.OS === 'android') {
               ToastAndroid.showWithGravity(res.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
               return;
            } else {
               Alert.alert(res.message);
               return;
            }

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
      if (Platform.OS === 'android') {
         ToastAndroid.showWithGravity("Error en el servidor", ToastAndroid.LONG, ToastAndroid.BOTTOM);
         return;
      } else {
         Alert.alert("Error en el servidor");
      }

   }
};

export const signup = async (data) => {
   const setIsLoading = useGlobalStore.getState().setIsLoading;
   const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;

   try {
      const req = await ApiUrl("/users", {
         method: "POST",
         data
      });
      if (!req.data.data) {
         setIsLoading(false);
         ToastAndroid.showWithGravity(
            "ERROR INESPERADO", //req.data,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
         );
         return;
      }
      const res = req.data.data;
      if (Platform.OS === 'android') {
         ToastAndroid.showWithGravity(res.alert_text, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      } else {
         Alert.alert(res.alert_text);
      }


      await setIsLoggedIn(false);
      return res;
   } catch (error) {
      setIsLoading(false);
      if (Platform.OS === 'android') {
         ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      } else {
         Alert.alert(error);
      }


   }
};

export const updatePassword = async (data) => {
   const setIsLoading = useGlobalStore.getState().setIsLoading;
   const auth = useAuthStore.getState().auth;

   try {
      await checkLoggedIn();
      let res = null;

      if (auth) {
         const req = await ApiUrl(`/users/updatepassword/${auth.id}`, {
            method: "POST",
            data
         });
         res = req.data.data;
         if (!res.status) {
            setIsLoading(false);
            if (Platform.OS === 'android') {
               ToastAndroid.showWithGravity(res.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
               return;
            } else {
               Alert.alert(res.message);
               return;
            }

         }
      }
      ApiUrl.defaults.headers.common["Authorization"] = null;
      ApiUrlFiles.defaults.headers.common["Authorization"] = null;
      return res;
   } catch (error) {
      setIsLoading(false);

      if (Platform.OS === 'android') {
         ToastAndroid.showWithGravity("Error en el servidor", ToastAndroid.LONG, ToastAndroid.BOTTOM);
         return;
      } else {
         Alert.alert("Error en el servidor");
         return;
      }

   }
};

export const getProfile = async () => {
   const auth = useAuthStore.getState().auth;

   try {
      if (auth) {
         const req = await ApiUrl(`/users/${auth.id}`, {
            method: "GET"
         });
         const res = req.data.data;
         if (res.status && res.result?.id) return true;
      }
      return false;
   } catch (error) {
      return false;
   }
};

export const checkLoggedIn = async () => {
   const auth = useAuthStore.getState().auth;
   const setAuth = useAuthStore.getState().setAuth;
   const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;
   const isLoggedIn = useAuthStore.getState().isLoggedIn;


   try {
      if (!auth) {
         await setAuth(null);
         await setIsLoggedIn(false);
      } else {
         const authValidate = await getProfile();
         if (!authValidate) {
            await setAuth(null);
            await setIsLoggedIn(false);
         } else {
            if (auth.token) {
               ApiUrl.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
               ApiUrlFiles.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
            }
            setIsLoggedIn(true);
         }
      }
      if (!auth && !isLoggedIn) {
         // return <Redirect href={"(auth)"} />;
         if (router.canDismiss()) router.dismissAll();
         else return <Redirect href={"/"} /> /* router.replace("auth") */;
      } else {
         return <Redirect href={"(main)"} />; // router.replace("(main)");
      }
   } catch (error) {
      return <Redirect href={"/"} />;
   }
};
