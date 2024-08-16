import React from "react";
import { Image, Pressable } from "react-native";
import images from "../constants/images";
import { useNavigation } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function ImagePressableComponent({ image, imageClassesStyle }) {
   const navigator = useNavigation();

   return (
      <StyledPressable
         className={`active:opacity-40 active:w-10`}
         onPress={() => navigator.openDrawer()}>
         <Image
            source={image}
            className={`w-11 h-11 ${imageClassesStyle}`}
            resizeMode="contain"
         />
      </StyledPressable>
   );
}
