import React from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import LoadingComponent from "../../components/LoadingComponent";
import useGlobalStore from "../../stores/globalStore";
import useAuthStore from "../../stores/authStore";

const AuthLayout = () => {
   const auth = useAuthStore((state) => state.auth);
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

   // if (auth) return <Redirect href="(main)" />;

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
