import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ButtonCompnent = ({
   title,
   handlePress,
   containerStyles,
   textStyles,
   isLoading,
   icon = null,
   positionIcon = "start",
}) => {
   return (
      <TouchableOpacity
         onPress={handlePress}
         activeOpacity={0.7}
         className={`bg-primary rounded-xl min-h-[62px] flex-row space-x-2 justify-center items-center px-2 ${containerStyles} ${
            isLoading ? "opacity-50" : ""
         }`}
         disabled={isLoading}>
         {icon && positionIcon === "start" && icon}
         <Text className={`text-white font-mbold text-lg ${textStyles}`}>
            {title.toUpperCase()}
         </Text>
         {icon && positionIcon === "end" && icon}
      </TouchableOpacity>
   );
};

export default ButtonCompnent;
