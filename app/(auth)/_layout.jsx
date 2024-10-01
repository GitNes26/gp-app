import React from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import LoadingComponent from "../../components/LoadingComponent";
import useGlobalStore from "../../stores/globalStore";
import useAuthStore from "../../stores/authStore";
import SplashComponent from "../../components/SplashComponent";

const AuthLayout = () => {
   const { auth } = useAuthStore();
   const { isLoading } = useGlobalStore();
   const data = [
      {
         name: "sign-in",
         options: { headerShown: false }
      },
      {
         name: "sign-up",
         options: { headerShown: false }
      }
   ];

   // if (auth) return <Redirect href="(main)" />;

   return (
      <>
         <SplashComponent visible={isLoading} />
         <Stack>
            {data.map((item) => (
               <Stack.Screen key={`key-Stack-Screen-${item.name}`} name={item.name} options={{ headerShown: item.options.headerShown }} />
            ))}
         </Stack>
         {/* {isLoading && <LoadingComponent />} */}
         {/* <StatusBar backgroundColor="#161622" style="inverted" /> */}
      </>
   );
};

export default AuthLayout;
