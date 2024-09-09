import React from "react";
import { Image, View } from "react-native";
import images from "../constants/images";
import ImagePressableComponent from "./ImagePressableComponent";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import colors from "../constants/colors";

export default function HeaderComponent({ isAuth = false }) {
   const { colorScheme } = useColorScheme();

   return (
      <>
         {isAuth ? (
            <Image
               source={images.bgAuthUp}
               className={"w-full h-40"}
               resizeMode="cover"
            />
         ) : (
            <View className={`bg-white border-b-2 border-gray-200/50`}>
               <Image
                  source={images.bgUp}
                  className={"w-full h-12"}
                  resizeMode="cover"
               />
               <View
                  className={`flex-row justify-center items-center my-2 px-2`}>
                  <View className={`flex w-[80%] items-center`}>
                     <Image
                        source={images.logo}
                        className={" h-20"}
                        resizeMode="contain"
                     />
                  </View>
                  <View className={`flex-1 items-end`}>
                     <ImagePressableComponent
                        image={images.user}
                        imageClassesStyle={``}
                     />
                  </View>
               </View>
            </View>
         )}
         <StatusBar
            backgroundColor={colors.primary[200]}
            style={colorScheme === "dark" ? "light" : "dark"}
            animated
         />
      </>
   );
}
