import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();
export const useGlobalContext = () => useGlobalContext(GlobalContext);

const GlobalProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [auth, setAuth] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   // useEffect(() => {
   //    console.log("Estoy en el useEffect de GLobalContext");
   // }, []);

   return (
      <GlobalContext.Provider
         value={{
            isLoggedIn,
            setIsLoggedIn,
            auth,
            setAuth,
            isLoading,
            setIsLoading,
         }}>
         {children}
      </GlobalContext.Provider>
   );
};
export default GlobalProvider;

export const getAllPhotos = async () => {
   try {
      const request = await fetch(
         "https://jsonplaceholder.typicode.com/photos",
      );
      let result = await request.json();
      result = result.slice(0, 10);
      return result;
   } catch (error) {
      console.log("🚀 ~ getAllPhotos ~ error:", error);
   }
};
