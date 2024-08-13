import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
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
         {/* <StatusBar backgroundColor="#161622" style="inverted" /> */}
      </>
   );
};

export default AuthLayout;
