import { styled } from "nativewind";
import React from "react";
import { Pressable } from "react-native";

const StyledPressable = styled(Pressable);

export default function IconPressableComponent({
   icon,
   handleOnPress,
   backdrop = false,
}) {
   return (
      <StyledPressable
         className={`active:opacity-60 ${backdrop && "m-1 p-1.5 bg-black-100/30 rounded-full"}`}
         onPress={handleOnPress}>
         {icon}
      </StyledPressable>
   );
}
