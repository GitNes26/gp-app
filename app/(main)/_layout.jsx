import { Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";

import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import images from "../../constants/images";
import LogoComponent from "../../components/LogoComponent";
import {
   DrawerContentScrollView,
   DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImagePressableComponent from "../../components/ImagePressableComponent";
import ButtonCompnent from "../../components/ButtonCompnent";
import useAuthStore, { logout } from "../../stores/authStore";

const data = [
   {
      name: "index",
      label: "Inicio",
      headerShown: false,
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
      name: "report",
      label: "Mis Reporte",
      title: "Reportes",
      headerShown: false,
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

const CustomDrawerContent = ({ ...props }) => {
   const router = useRouter();
   const { top, bottom } = useSafeAreaInsets();

   return (
      <View className={"flex-1"}>
         <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ backgroundColor: colors.primary[200] }}>
            <View className={`justify-center items-center py-5 `}>
               <Image
                  source={images.profile}
                  className={"w-[100px] h-[100px] rounded-full"}
                  resizeMode="cover"
               />
               <Text className={`font-msemibold text-primary-100 text-[15px]`}>
                  Nombre de Usuario
               </Text>
            </View>
            <View className={`bg-white pt-1`}>
               <DrawerItemList {...props} />
               {/* <DrawerItem
                  label={"Direcctorio"}
                  onPress={() => router.replace("/")}
               /> */}
            </View>
         </DrawerContentScrollView>
         <View
            className={`py-3 px-5 pb-[${20 + bottom}]`}
            style={{ borderTopColor: colors.gray[100], borderTopWidth: 1 }}>
            <ButtonCompnent
               containerStyles={`bg-gray-500`}
               icon={
                  <Ionicons
                     name="arrow-back-circle-sharp"
                     size={22}
                     color="white"
                  />
               }
               title={"Cerrar Sesión"}
               handleOnPress={() => logout()}
            />
         </View>
      </View>
   );
};

const DrawerGroup = () => {
   // const { top, bottom } = SafeAreaInsetsContext();
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
   const { auth } = useAuthStore();
   console.log("🚀 ~ MainLayout ~ auth:", auth);

   if (!auth) {
      router.canDismiss() && router.dismissAll();
      return <Redirect href="(auth)" />;
   }

   // useEffect(() => {
   //    console.log("🚀 ~ MainLayout ~ auth:", auth);
   // }, [auth]);

   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <DrawerGroup />
         {/* <TabsGroup /> */}
         {/* <StatusBar backgroundColor="#161622" style="inverted" /> */}
      </GestureHandlerRootView>
   );
};

export default MainLayout;
