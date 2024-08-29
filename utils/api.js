import axios from "axios";
import { API_URL } from "@env";

export const ApiUrl = axios.create({
   baseURL: API_URL,
   responseType: "json",
   withCredentials: true,
   headers: { "Content-Type": "application/json" },
});

export const ApiUrlFiles = axios.create({
   baseURL: API_URL,
   responseType: "json",
   withCredentials: true,
   headers: {
      "Content-Type": "multipart/form-data", // Asegúrate de establecer el encabezado adecuado
   },
});
