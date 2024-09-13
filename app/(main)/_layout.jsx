import React, { useEffect } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import useAuthStore from "../../stores/authStore";
import useGlobalStore from "../../stores/globalStore";
import HeaderComponent from "../../components/HeaderComponent";
import DrawerGroup from "../../components/navigation/DrawerComponent";

const data = [
   {
      name: "index",
      label: "Inicio",
      headerShown: true,
      show: true,
      title: "",
      header: () => <HeaderComponent />,
      icon: {
         focus: "home",
         disfocus: "home-outline"
      }
   },
   {
      name: "[reportname]",
      label: "Nuevo Reporte",
      title: "Nuevo Reporte",
      header: () => <HeaderComponent />,
      headerShown: true,
      show: false,
      icon: {
         focus: "newspaper",
         disfocus: "newspaper-outline"
      }
   },
   {
      name: "my-reports",
      label: "Mis Reportes",
      title: "Mis Reportes",
      headerShown: false,
      show: true,
      icon: {
         focus: "reader",
         disfocus: "reader-outline"
      }
   },
   {
      name: "profile",
      label: "Mi Perfil",
      title: "Mi Perfil",
      headerShown: false,
      show: false,
      icon: {
         focus: "person",
         disfocus: "person-outline"
      }
   },
   {
      name: "demo",
      label: "Demo",
      title: "Demo",
      headerShown: true,
      show: false,
      icon: {
         focus: "settings",
         disfocus: "settings-outline"
      }
   }
];

const MainLayout = () => {
   const { isLoading } = useGlobalStore();
   const { auth, isLoggedIn } = useAuthStore();

   // useEffect(() => {
   //    console.log("🚀 ~ MainLayout ~ auth:", auth);
   //    // console.log("🚀 ~ MainLayout ~ isLoggedIn:", isLoggedIn);
   //    // console.log("🚀 ~ MainLayout ~ isLoading:", isLoading);
   //    if (!isLoading && !auth && !isLoggedIn) {
   //       router.replace("(auth)");
   //    }
   // }, [isLoggedIn]);

   // useEffect(() => {
   //    console.log("cada cuando ocurre?");
   // }, []);

   // if (!isLoading && !auth && !isLoggedIn) return <Redirect href={"(auth)"} />;

   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <DrawerGroup data={data} />
         {/* <Slot /> */}
         {/* <TabsGroup /> */}
         {/* <StatusBar backgroundColor="#161622" style="inverted" /> */}
      </GestureHandlerRootView>
   );
};

export default MainLayout;
