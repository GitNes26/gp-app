import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const ButtonCompnent = ({
   title,
   handlePress,
   containerStyles,
   textStyles,
   isLoading,
}) => {
   return (
      <TouchableOpacity
         onPress={handlePress}
         activeOpacity={0.7}
         className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center px-2 ${containerStyles} ${
            isLoading ? "opacity-50" : ""
         }`}
         disabled={isLoading}>
         <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
            {title}
         </Text>
      </TouchableOpacity>
   );
};

export default ButtonCompnent;

const styles = StyleSheet.create({});
