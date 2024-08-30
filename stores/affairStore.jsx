import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ApiUrl, ApiUrlFiles } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const useAffairStore = create((set) => ({
   affair: null,
   affairs: [],
   setAffair: (affair) => set({ affair }),
   removeAffair: () => set({ affair: null }),
}));
export default useAffairStore;

export const login = async (data) => {
   // const setAffair = useAffairStore((state) => state.setAffair);
   const affair = useAffairStore.getState().affair;
   const setAffair = useAffairStore.getState().setAffair;

   try {
      const req = await ApiUrl("/login", {
         method: "POST",
         data,
      });
      // console.log("🚀 ~ login ~ req:", req.data.res);
      const res = req.data.data;
      ApiUrl.defaults.headers.common["Affairorization"] =
         `Bearer ${res.result.token}`;
      ApiUrlFiles.defaults.headers.common["Affairorization"] =
         `Bearer ${res.result.token}`;
      // console.log("🚀 ~ login ~ res:", res);
      await setAffair(res.result);
      router.push("(main)");
   } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
   }
};

export const logout = async () => {
   const affair = useAffairStore.getState().affair;
   const removeAffair = useAffairStore.getState().removeAffair;

   try {
      const req = await ApiUrl(`/logout/${affair.id}`, {
         method: "POST",
      });
      // console.log("🚀 ~ login ~ req:", req.data.res);
      const res = req.data.data;
      ApiUrl.defaults.headers.common["Affairorization"] = null;
      ApiUrlFiles.defaults.headers.common["Affairorization"] = null;
      console.log("🚀 ~ logout ~ res:", res);
      await removeAffair();
      await AsyncStorage.getAllKeys();
      router.canDismiss() && router.dismissAll();
   } catch (error) {
      console.log("🚀 ~ logout ~ error:", error);
   }
};
