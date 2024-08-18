import React from "react";
import { Image, View } from "react-native";
import images from "../constants/images";

export default function FooterComponent() {
   return (
      <View className={`bg-white`}>
         <View className={`flex-row justify-evenly mt-1 -mb-3`}>
            <Image
               source={images.logoGray}
               className={"w-[100px] h-10"}
               resizeMode="contain"
            />
            <Image
               source={images.logoGPDgray}
               className={"w-[100px] h-10"}
               resizeMode="contain"
            />
         </View>
         <Image
            source={images.bgDown}
            className={"w-full h-10"}
            resizeMode="cover"
         />
      </View>
   );
}
