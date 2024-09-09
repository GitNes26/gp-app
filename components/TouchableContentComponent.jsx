import React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function TouchableContentComponent({
   children,
   styleContet,
   onPress,
}) {
   return (
      <TouchableOpacity
         className={`active:opacity-40 ${styleContet}`}
         // activeOpacity={0.7}
         delayPressOut={100}
         onPress={onPress}>
         {children}
      </TouchableOpacity>
   );
}
