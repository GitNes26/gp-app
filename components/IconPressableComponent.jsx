import { styled } from "nativewind";
import React from "react";
import { Pressable } from "react-native";

const StyledPressable = styled(Pressable);

export default function IconPressableComponent({ icon }) {
   return (
      <StyledPressable className={`active:opacity-60`}>{icon}</StyledPressable>
   );
}
