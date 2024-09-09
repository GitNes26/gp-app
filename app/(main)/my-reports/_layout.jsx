import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MyReportsLayout = () => {
   const { top, bottom } = useSafeAreaInsets();

   const data = [
      {
         name: "index",
         options: { headerShown: false, presentation: "modal" },
      },
   ];

   return (
      <>
         <Stack>
            {data.map((item) => (
               <Stack.Screen
                  key={`key-Stack-Screen-${item.name}`}
                  name={item.name}
                  options={{
                     headerShown: item.options.headerShown,
                     headerShadowVisible: true,
                     presentation: "modal",
                     contentStyle: {
                        // top: top - 1,
                     },
                  }}
               />
            ))}
         </Stack>
         {/* <StatusBar backgroundColor="#161622" style="inverted" /> */}
      </>
   );
};

export default MyReportsLayout;
