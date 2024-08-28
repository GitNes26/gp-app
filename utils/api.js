import axios from "axios";

export const ApiAxios = axios.create({
   baseURL: "https://backend.atc.gomezpalacio.gob.mx/api/gomezapp",
   responseType: "json",
   withCredentials: true,
   headers: { "Content-Type": "application/json" },
});
