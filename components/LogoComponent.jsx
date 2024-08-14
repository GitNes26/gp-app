import React from "react";
import { Image, Pressable } from "react-native";
import images from "../constants/images";
import { useNavigation } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function LogoComponent() {
   const navigator = useNavigation();

   return (
      <StyledPressable
         className={`active:opacity-40 active:w-10`}
         onPress={() => navigator.openDrawer()}>
         <Image source={images.icon} className={"w-14"} resizeMode="contain" />
      </StyledPressable>
   );
}
