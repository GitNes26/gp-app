import { styled } from "nativewind";
import React from "react";
import { Pressable, Text, View } from "react-native";

const StyledPressable = styled(Pressable);

export default function IconPressableComponent({
   icon,
   handleOnPress,
   backdrop = false,
   styleContent,
}) {
   return (
      <StyledPressable
         className={`active:opacity-60 ${backdrop && "m-1 p-1.5 bg-black-100/30 rounded-full"} ${styleContent}`}
         onPress={handleOnPress}>
         {icon}
      </StyledPressable>
   );
}

export const ItemIconText = ({ icon, text }) => {
   return (
      <View className={`flex items-center justify-center min-w-[50px]`}>
         {icon}
         <Text className={`text-xs font-mmedium mt-1`}>{text}</Text>
      </View>
   );
};
