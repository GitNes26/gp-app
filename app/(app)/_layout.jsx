import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
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
import IconPressableComponent from "../../components/IconPressableComponent";
import images from "../../constants/images";
import LogoComponent from "../../components/LogoComponent";

const data = [
   {
      name: "home",
      title: "Inicio",
      iconImg: true,
      icon: icons.home,
      iconsPackage: "AntDesign",
      iconSize: 20,
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

const DrawerGroup = () => {
   return (
      <Drawer
         screenOptions={{
            // headerShown: false,
            headerLeft: () => <LogoComponent />,
            headerRight: () => <LogoComponent />,
         }}>
         {/* <Image
               source={images.logo}
               className={"w-full"}
               resizeMode="contain"
            /> */}
         <Drawer.Screen
            name="index" // This is the name of the page and must match the url from root
            options={{
               drawerLabel: "Home",
               title: "overview",
            }}
         />
      </Drawer>
   );
};

const AppLayout = () => {
   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <DrawerGroup />
         {/* <TabsGroup /> */}
      </GestureHandlerRootView>
   );
};

export default AppLayout;
