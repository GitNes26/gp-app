import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs, useRouter } from "expo-router";
import icons from "../../constants/icons";
import { Drawer } from "expo-router/drawer";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
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
      label: "Levantar Reporte",
      title: "Reporte",
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
      name: "sign-in",
      options: { headerShown: false },
   },
   {
      name: "sign-up",
      options: { headerShown: false },
   },
];

const TabIcon = ({
   icon,
   color,
   name,
   focused,
   iconImg,
   iconSize = 24,
   iconsPackage,
}) => (
   <View className={"items-center justify-around h-full py-2"}>
      {iconImg ? (
         <Image
            source={icon}
            resizeMode="contain"
            tintColor={color}
            className={`w-6 h-6`}
         />
      ) : iconsPackage == "AntDesign" ? (
         <AntDesign name={icon} size={iconSize} color={color} />
      ) : iconsPackage == "FontAwesome" ? (
         <FontAwesome name={icon} size={iconSize} color={color} />
      ) : iconsPackage == "MaterialIcons" ? (
         <MaterialIcons name={icon} size={iconSize} color={color} />
      ) : iconsPackage == "FontAwesome5" ? (
         <FontAwesome5 name={icon} size={iconSize} color={color} />
      ) : iconsPackage == "FontAwesome6" ? (
         <FontAwesome6 name={icon} size={iconSize} color={color} />
      ) : iconsPackage == "Ionicons" ? (
         <Ionicons name={icon} size={iconSize} color={color} />
      ) : null}
      <Text
         className={`${focused ? "font-semibold" : "font-regular"} text-xs`}
         style={{ color: color }}>
         {name}
      </Text>
   </View>
);
const TabsGroup = () => {
   return (
      <Tabs
         className={"items-center justify-center gap-2"}
         screenOptions={{ tabBarShowLabel: false }}>
         {data.map((item, i) => (
            <Tabs.Screen
               key={`key-Tabs.Screen-${i}`}
               name={item.name}
               options={{
                  title: item.title,
                  headerShown: false,
                  tabBarActiveTintColor: colors.secondary.DEFAULT,
                  tabBarInactiveTintColor: colors.gray.DEFAULT,
                  tabBarStyle: {
                     backgroundColor: colors.primary.DEFAULT,
                     borderTopWidth: 1,
                     borderTopColor: colors.secondary.DEFAULT,
                     height: 65,
                  },
                  tabBarIcon: ({ color, focused }) => (
                     <TabIcon
                        key={`key-TabIcon-${i}`}
                        iconImg={item.iconImg}
                        icon={item.icon}
                        iconSize={item.iconSize}
                        iconsPackage={item.iconsPackage}
                        color={color}
                        name={item.title}
                        focused={focused}
                     />
                  ),
               }}
            />
         ))}
      </Tabs>
   );
};

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
            className={`p-5 pb-[${20 + bottom}]`}
            style={{ borderTopColor: colors.gray[100], borderTopWidth: 1 }}>
            <ButtonCompnent
               containerStyles={`bg-gray-500`}
               textStyles={`text-md`}
               icon={
                  <Ionicons
                     name="arrow-back-circle-sharp"
                     size={22}
                     color="white"
                  />
               }
               title={"Cerrar Sesión"}
               handleOnPress={() => router.dismissAll()}
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
            // headerShown: false,
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
   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <DrawerGroup />
         {/* <TabsGroup /> */}
         {/* <StatusBar backgroundColor="#161622" style="inverted" /> */}
      </GestureHandlerRootView>
   );
};

export default MainLayout;
