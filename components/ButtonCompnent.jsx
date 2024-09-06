import {
   ActivityIndicator,
   StyleSheet,
   Text,
   TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import colors from "../constants/colors";

const ButtonCompnent = ({
   title,
   handleOnPress,
   containerStyles,
   textStyles,
   isLoading,
   colorisLoading = colors.primary[100],
   icon = null,
   positionIcon = "start",
}) => {
   return (
      <TouchableOpacity
         onPress={handleOnPress}
         activeOpacity={0.7}
         className={`bg-primary rounded-xl min-h-[62px] flex-row space-x-2 justify-center items-center px-2 ${containerStyles} ${
            isLoading ? "opacity-50" : ""
         }`}
         disabled={isLoading}>
         {icon && positionIcon === "start" && icon}
         <Text className={`text-white font-mbold text-lg ${textStyles}`}>
            {title.toUpperCase()}
            &nbsp; &nbsp;
            {isLoading && (
               <ActivityIndicator
                  size={"small"}
                  color={colorisLoading}
                  className={`ml-2 pt-2`}
                  // className={`absolute -top-[50%] left-[40%]`}
               />
            )}
         </Text>
         {icon && positionIcon === "end" && icon}
      </TouchableOpacity>
   );
};

export default ButtonCompnent;
