import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import LoadingComponent from "../../components/LoadingComponent";
import useGlobalStore from "../../stores/globalStore";

const AuthLayout = () => {
   const loading = useGlobalStore((state) => state.loading);
   const data = [
      {
         name: "sign-in",
         options: { headerShown: false },
      },
      {
         name: "sign-up",
         options: { headerShown: false },
      },
   ];

   return (
      <>
         <Stack>
            {data.map((item) => (
               <Stack.Screen
                  key={`key-Stack-Screen-${item.name}`}
                  name={item.name}
                  options={{ headerShown: item.options.headerShown }}
               />
            ))}
         </Stack>
         {loading && <LoadingComponent />}
         {/* <StatusBar backgroundColor="#161622" style="inverted" /> */}
      </>
   );
};

export default AuthLayout;
