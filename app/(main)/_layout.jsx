import { Image, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router } from "expo-router";
import { Drawer } from "expo-router/drawer";

import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import images from "../../constants/images";
import LogoComponent from "../../components/LogoComponent";
import ImagePressableComponent from "../../components/ImagePressableComponent";
import useAuthStore from "../../stores/authStore";
import useGlobalStore from "../../stores/globalStore";
import CustomDrawerContent from "../../components/navigation/CustomDrawerContent";

const data = [
   {
      name: "index",
      label: "Inicio",
      headerShown: false,
      show: true,
      title: () => (
         <View className={`justify-center items-center `}>
            <Image
               source={images.logo}
               className={"h-12"}
               resizeMode="contain"
            />
         </View>
      ),
      icon: {
         focus: "home",
         disfocus: "home-outline",
      },
   },
   {
      name: "my-reports",
      label: "Mis Reporte",
      title: "Reportes",
      headerShown: false,
      show: true,
      icon: {
         focus: "reader",
         disfocus: "reader-outline",
      },
   },
   {
      name: "profile",
      label: "Mi Perfil",
      title: "",
      headerShown: false,
      show: true,
      icon: {
         focus: "person",
         disfocus: "person-outline",
      },
   },
   {
      name: "demo",
      label: "Demo",
      title: "Demo",
      headerShown: true,
      show: true,
      icon: {
         focus: "settings",
         disfocus: "settings-outline",
      },
   },
   {
      name: "[affairId]",
      label: "AffairId",
      title: "Reporte reporte",
      headerShown: false,
      show: false,
      icon: {
         focus: "settings",
         disfocus: "settings-outline",
      },
   },
];
const dataStack = [
   {
      name: "index",
      options: { headerShown: false },
   },
   {
      name: "addReport",
      options: { headerShown: false },
   },
];

const DrawerGroup = () => {
   return (
      <Drawer
         drawerContent={CustomDrawerContent}
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
            headerShown: false,
            headerLeft: () => (
               <ImagePressableComponent
                  image={images.profile}
                  imageClassesStyle={`rounded-full ml-2`}
               />
            ),
            headerRight: () => (
               <View className={`mr-2`}>
                  <LogoComponent />
               </View>
            ),
         }}>
         {data.map((item) => (
            <Drawer.Screen
               key={`key-drawer-screen-${item.name}`}
               name={item.name} // This is the name of the page and must match the url from root
               options={({ route }) => ({
                  drawerItemStyle: {
                     display: !item.show ? "none" : "flex",
                  },
                  headerShown: item.headerShown,
                  drawerLabel: item.label,
                  headerTitle: item.title,
                  drawerIcon: ({ size, color, focused }) => {
                     // let iconName = "";
                     // if (route.name === "home")
                     //    iconName = focused ? "home" : "home-outline";
                     // else if (route.name === "index")
                     //    iconName = focused
                     //       ? "notifications"
                     //       : "notifications-outline";
                     // else if (route.name === "Settings")
                     //    iconName = focused ? "settings" : "settings-outline";
                     return (
                        <Ionicons
                           name={focused ? item.icon.focus : item.icon.disfocus}
                           size={size}
                           color={color}
                        />
                     );
                  },
               })}
            />
         ))}
      </Drawer>
   );
};

const MainLayout = () => {
   const { isLoading } = useGlobalStore();
   const { auth, isLoggedIn } = useAuthStore();

   useEffect(() => {
      console.log("🚀 ~ MainLayout ~ auth:", auth);
      console.log("🚀 ~ MainLayout ~ isLoggedIn:", isLoggedIn);
      console.log("🚀 ~ MainLayout ~ isLoading:", isLoading);
      if (!isLoading && !auth && !isLoggedIn) {
         console.log("no hay nadita");
         router.replace("(auth)");
      }
   }, [isLoggedIn]);

   // if (!isLoading && auth && isLoggedIn) return <Redirect href={"(auth)"} />;

   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <DrawerGroup />
         {/* <TabsGroup /> */}
         {/* <StatusBar backgroundColor="#161622" style="inverted" /> */}
      </GestureHandlerRootView>
   );
};

export default MainLayout;
