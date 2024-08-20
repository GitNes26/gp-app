import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "../icons";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

const data = [
   {
      name: "home",
      title: "Inicio",
      iconImg: true,
      icon: icons.home,
      iconsPackage: "AntDesign",
      iconSize: 20,
   },
   {
      name: "transmissions",
      title: "Transmisión",
      iconImg: false,
      icon: "live-tv",
      iconsPackage: "MaterialIcons",
      iconSize: 20,
   },
   {
      name: "donations",
      title: "Donaciones",
      iconImg: false,
      icon: "donate",
      iconsPackage: "FontAwesome5",
      iconSize: 20,
   },
   {
      name: "about",
      title: "Nosotros",
      iconImg: false,
      icon: "info-circle",
      iconsPackage: "FontAwesome5",
      iconSize: 20,
   },
   {
      name: "ministries",
      title: "Ministerios",
      iconImg: false,
      icon: "handshake-simple",
      iconsPackage: "FontAwesome6",
      iconSize: 20,
   },
   {
      name: "music",
      title: "Música",
      iconImg: false,
      icon: "musical-notes",
      iconsPackage: "Ionicons",
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

const TabsLayout = () => {
   return (
      <>
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
      </>
   );
};

export default TabsLayout;

const styles = StyleSheet.create({});
