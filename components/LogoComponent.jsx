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
         className={`active:opacity-40 active:w-10 justify-center items-center`}
         onPress={() => navigator.openDrawer()}>
         <Image
            source={images.icon}
            className={"w-11 h-11"}
            resizeMode="contain"
         />
      </StyledPressable>
   );
}
