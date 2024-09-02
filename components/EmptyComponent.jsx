import { View, Text, Image } from "react-native";
import React from "react";
import images from "../constants/images";

const EmptyComponent = ({ title, subtitle }) => {
   return (
      <View className={"justify-center items-center px-4"}>
         <Image
            source={images.empty}
            className={"w-[350px] h-[200px]"}
            resizeMode="contain"
         />
         <Text
            className={"text-xl text-center font-semibold text-black-100 mt-1"}>
            {title}
         </Text>
         <Text className={"font-medium text-sm text-gray-500"}>{subtitle}</Text>
      </View>
   );
};

export default EmptyComponent;
