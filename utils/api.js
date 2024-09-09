import axios from "axios";
import { API_URL } from "@env";

export const ApiUrl = axios.create({
   baseURL: API_URL,
   responseType: "json",
   withCredentials: true,
   headers: { Accept: "application/json", "Content-Type": "application/json" },
   // headers: { common: { "Content-Type": "application/json" } },
});

export const ApiUrlFiles = axios.create({
   baseURL: API_URL,
   responseType: "json",
   withCredentials: true,
   headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
   },
   // headers: { common: { "Content-Type": "multipart/form-data" } },
});
