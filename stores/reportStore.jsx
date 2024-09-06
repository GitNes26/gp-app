import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ApiUrl, ApiUrlFiles } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import useAuthStore, { checkLoggedIn } from "./authStore";

const useReportStore = create((set) => ({
   report: null,
   reports: [],
   formData: {},
   setReport: (report) => set((state) => ({ report })),
   removeReport: () => set((state) => ({ report: null })),
   setAllReports: (reports) => set((state) => ({ reports })),
   removeAllReports: () => set((state) => ({ reports: [] })),
}));
export default useReportStore;

export const getAllReports = async () => {
   const auth = useAuthStore.getState().auth;
   const setAllReports = useReportStore.getState().setAllReports;

   try {
      // await checkLoggedIn();

      if (auth) {
         const req = await ApiUrl("/app/reportes", {
            method: "GET",
         });
         // console.log("🚀 ~ getAllReports ~ req:", req.data.res);
         const res = req.data.data;

         const reportsApp = await res.result.filter((item) => item.app === 1);
         res.result = reportsApp;
         // console.log("🚀 ~ getAllReports ~ res:", res);
         await setAllReports(res.result);
         return res;
      }
   } catch (error) {
      console.log("🚀 ~ getAllReports ~ error:", error);
   }
};

export const getReport = async () => {
   const report = useReportStore.getState().report;
   const removeReport = useReportStore.getState().removeReport;

   try {
      // await checkLoggedIn();
      // const req = await ApiUrl(`/logout/${report.id}`, {
      //    method: "POST",
      // });
      // // console.log("🚀 ~ login ~ req:", req.data.res);
      // const res = req.data.data;
      // ApiUrl.defaults.headers.common["Reportorization"] = null;
      // ApiUrlFiles.defaults.headers.common["Reportorization"] = null;
      // console.log("🚀 ~ logout ~ res:", res);
      // await removeReport();
      // await AsyncStorage.getAllKeys();
      // router.canDismiss() && router.dismissAll();
   } catch (error) {
      console.log("🚀 ~ logout ~ error:", error);
   }
};

export const postReport = async (data) => {
   const auth = useAuthStore.getState().auth;

   try {
      // await checkLoggedIn();

      if (auth) {
         const req = await ApiUrlFiles("/app/reportes", {
            method: "POST",
            data,
         });
         console.log("🚀 ~ postReport ~ req:", req.data.res);
         const res = req.data.data;
         res.result = reportsApp;
         // console.log("🚀 ~ postReport ~ res:", res);
         return res;
      }
   } catch (error) {
      console.log("🚀 ~ postReport ~ error:", error);
   }
};
