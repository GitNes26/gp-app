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
   DrawerItem,
   DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImagePressableComponent from "../../components/ImagePressableComponent";
import ButtonCompnent from "../../components/ButtonCompnent";
import useAuthStore, { checkLoggedIn, logout } from "../../stores/authStore";
import useGlobalStore from "../../stores/globalStore";

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

const CustomDrawerContent = async ({ ...props }) => {
   const { loading, setLoading } = useGlobalStore();
   const router = useRouter();
   const { top, bottom } = useSafeAreaInsets();

   const { auth, isLoggedIn } = useAuthStore();

   const handlePressLogout = async () => {
      setLoading(true);
      await logout();
      router.dismissAll();
      setLoading(false);
   };

   if (!auth && !isLoggedIn) return;

   return (
      <View className={"flex-1"}>
         <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ backgroundColor: colors.primary[200] }}>
            <View className={`justify-center items-center py-5 `}>
               <Image
                  source={images.profile_manada}
                  className={"w-[100px] h-[100px] rounded-full"}
                  resizeMode="contain"
               />
               <Text className={`font-msemibold text-primary-100 text-[15px]`}>
                  {auth.email}
               </Text>
            </View>
            <View className={`bg-white pt-1`}>
               <DrawerItemList {...props} />
            </View>
         </DrawerContentScrollView>
         <View
            className={`pb-[${20 + bottom}]`}
            style={{ borderTopColor: colors.gray[100], borderTopWidth: 1 }}>
            <ButtonCompnent
               containerStyles={`w-full bg-gray-100/50 rounded-none`}
               textStyles={`text-gray-500`}
               icon={
                  <Ionicons
                     name="arrow-back-circle-sharp"
                     size={22}
                     color={colors.gray[500]}
                  />
               }
               title={"Cerrar Sesión"}
               handleOnPress={() => handlePressLogout()}
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
   const { auth, isLoggedIn } = useAuthStore();

   // if (!auth && !isLoggedIn) {
   //    console.log("ya no tengo auth");
   //    // console.log("puedo regresar?", router.canDismiss());
   //    return router.replace("(auth)");
   //    return <Redirect href={"(auth)"} />;
   // }

   useEffect(() => {}, []);

   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <DrawerGroup />
         {/* <TabsGroup /> */}
         {/* <StatusBar backgroundColor="#161622" style="inverted" /> */}
      </GestureHandlerRootView>
   );
};

export default MainLayout;
