import React from "react";
import { Image, Text, View } from "react-native";
import images from "../constants/images";
import Constant from "expo-constants";
import { VERSION_APP } from "../constants/globals";

export default function FooterComponent({ isAuth = false }) {
   return (
      <>
         {isAuth ? (
            <View className={``}>
               <Image source={images.bgAuthDown} className={"w-full h-40"} resizeMode="cover" />
               <Text className={`absolute bottom-3 right-5 font-mregular text-primary`}>v. {VERSION_APP}</Text>
            </View>
         ) : (
            <View className={`bg-white`}>
               <View className={`flex-row justify-evenly mt-1 -mb-3`}>
                  <Image source={images.logoGray} className={"w-[100px] h-10"} resizeMode="contain" />
                  <Image source={images.logoGPDgray} className={"w-[100px] h-10"} resizeMode="contain" />
                  <Text className={`text-xs  font-mregular text-gray-400 my-auto`}>v. {VERSION_APP}</Text>
               </View>
               <Image source={images.bgDown} className={"w-full h-10"} resizeMode="cover" />
            </View>
         )}
      </>
   );
}
