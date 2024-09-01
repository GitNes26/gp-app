import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ApiUrl, ApiUrlFiles } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import useAuthStore, { checkLoggedIn } from "./authStore";

const useAffairStore = create((set) => ({
   affair: null,
   affairs: [],
   formData: {},
   setAffair: (affair) => set((state) => ({ affair })),
   removeAffair: () => set((state) => ({ affair: null })),
   setAllAffairs: (affairs) => set((state) => ({ affairs })),
   removeAllAffairs: () => set((state) => ({ affairs: [] })),
}));
export default useAffairStore;

export const getAllAffairs = async () => {
   // const setAffair = useAffairStore((state) => state.setAffair);
   const affairs = useAffairStore.getState().affairs;
   const setAllAffairs = useAffairStore.getState().setAllAffairs;

   try {
      await checkLoggedIn();

      const req = await ApiUrl("/asuntos", {
         method: "GET",
      });
      // console.log("🚀 ~ getAllAffairs ~ req:", req.data.res);
      const res = req.data.data;

      const affairsApp = await res.result.filter((item) => item.app === 1);
      res.result = affairsApp;
      // console.log("🚀 ~ getAllAffairs ~ res:", res);
      await setAllAffairs(res.result);
      return res;
   } catch (error) {
      console.log("🚀 ~ getAllAffairs ~ error:", error);
   }
};

export const getAffair = async () => {
   const affair = useAffairStore.getState().affair;
   const removeAffair = useAffairStore.getState().removeAffair;

   try {
      // await checkLoggedIn();
      // const req = await ApiUrl(`/logout/${affair.id}`, {
      //    method: "POST",
      // });
      // // console.log("🚀 ~ login ~ req:", req.data.res);
      // const res = req.data.data;
      // ApiUrl.defaults.headers.common["Affairorization"] = null;
      // ApiUrlFiles.defaults.headers.common["Affairorization"] = null;
      // console.log("🚀 ~ logout ~ res:", res);
      // await removeAffair();
      // await AsyncStorage.getAllKeys();
      // router.canDismiss() && router.dismissAll();
   } catch (error) {
      console.log("🚀 ~ logout ~ error:", error);
   }
};
