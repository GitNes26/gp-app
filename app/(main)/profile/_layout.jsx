import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderComponent from "../../../components/HeaderComponent";
import colors from "../../../constants/colors";

const ProfileLayout = () => {
   const { top, bottom } = useSafeAreaInsets();

   const data = [
      {
         name: "index",
         title: "Mi Perfil",
         header: () => <HeaderComponent />,
         headerShown: true,
         icon: {
            focus: "newspaper",
            disfocus: "newspaper-outline"
         },
         presentation: "modal"
      },
      {
         name: "change-password",
         label: "Cambiar contraseña",
         title: "Cambiar contraseña",
         // header: () => <HeaderComponent />,
         headerShown: true,
         icon: {
            focus: "newspaper",
            disfocus: "newspaper-outline"
         }
      }
   ];

   return (
      <>
         <Stack
            screenOptions={{
               headerTitleStyle: {
                  fontWeight: "800"
                  // color: "white"
               },
               headerStyle: {
                  backgroundColor: colors.primary[200]
               },
               contentStyle: {
                  width: "100%",
                  alignItems: "center"
               },
               headerShown: true,
               headerShadowVisible: true
            }}
         >
            {data.map((item) => (
               <Stack.Screen
                  key={`key-Stack-Screen-${item.name}`}
                  name={item.name}
                  options={{
                     headerShown: item.headerShown,
                     title: item.title,
                     header: item.header,
                     headerShadowVisible: true,
                     presentation: "modal",
                     contentStyle: {
                        // top: top - 1
                     }
                  }}
               />
            ))}
         </Stack>
         {/* <StatusBar backgroundColor="#161622" style="inverted" /> */}
      </>
   );
};

export default ProfileLayout;
