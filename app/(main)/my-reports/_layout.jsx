import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderComponent from "../../../components/HeaderComponent";
import colors from "../../../constants/colors";

const MyReportsLayout = () => {
   const { top, bottom } = useSafeAreaInsets();

   const data = [
      {
         name: "index",
         title: "Detalle de reporte",
         header: () => <HeaderComponent />,
         headerShown: true,
         icon: {
            focus: "newspaper",
            disfocus: "newspaper-outline",
         },
         presentation: "modal",
      },
      {
         name: "details",
         label: "",
         title: "Detalle de Reporte",
         // header: () => <HeaderComponent />,
         headerShown: true,
         icon: {
            focus: "newspaper",
            disfocus: "newspaper-outline",
         },
      },
   ];

   return (
      <>
         <Stack
            screenOptions={{
               drawerActiveBackgroundColor: colors.primary.DEFAULT,
               drawerActiveTintColor: colors.primary[100],
               drawerLabelStyle: { marginLeft: -20, fontWeight: "bold" },
               // drawerHideStatusBarOnOpen: true,
               headerTitleStyle: {
                  fontWeight: "800",
               },
               headerTitleContainerStyle: {
                  // backgroundColor: "red",
                  width: "100%",
                  alignItems: "center",
               },
               headerStyle: {
                  // backgroundColor: "yellow",
                  // height: "10%",
               },
               headerShown: true,
               headerShadowVisible: true,
            }}>
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
