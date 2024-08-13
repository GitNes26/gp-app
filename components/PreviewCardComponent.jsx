import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import images from "../constants/images";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import icons from "../constants/icons";

const PreviewCardComponent = ({
   video: {
      title,
      url,
      thumbnailUrl,
      // creator: { avatar, name },
   },
}) => {
   const [play, setPlay] = useState(false);

   return (
      <View className={"flex-col items-center px-4 mb-14"}>
         <View className={"flex-row gap-3 items-start"}>
            <View className={"justify-center items-center flex-row flex-1"}>
               <View
                  className={
                     "w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5"
                  }>
                  <Image
                     source={{ uri: thumbnailUrl }}
                     className={"w-full h-full rounded-lg"}
                     resizeMode="cover"
                  />
               </View>
               <View className={"justify-center flex-1 ml-3 gap-y-1"}>
                  <Text
                     className={"text-white font-psemibold text-sm"}
                     numberOfLines={2}>
                     {title}
                  </Text>
                  <Text
                     className={"text-gray-100 font-pregular text-sm"}
                     numberOfLines={2}>
                     {title}
                  </Text>
               </View>
               <View className={"pt-2"}>
                  <Ionicons
                     name="ellipsis-vertical-outline"
                     size={24}
                     color={colors.gray[100]}
                  />
               </View>
            </View>
         </View>

         {play ? (
            <Text className={"text-white"}>Reproduciendo...</Text>
         ) : (
            <TouchableOpacity
               activeOpacity={0.7}
               className={
                  "w-full h-60 rounded-xl mt-3 relative justify-center items-center"
               }
               onPress={() => setPlay(true)}>
               <Image
                  source={{ uri: thumbnailUrl }}
                  className="w-full h-full rounded-xl mt-3"
                  resizeMode="cover"
               />
               <Image
                  source={icons.play}
                  className="w-12 h-12 absolute"
                  resizeMode="contain"
               />
            </TouchableOpacity>
         )}
      </View>
   );
};

export default PreviewCardComponent;
