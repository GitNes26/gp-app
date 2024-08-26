import React from "react";
import { Image, Pressable } from "react-native";
import images from "../constants/images";
import { useNavigation } from "expo-router";
import { styled } from "nativewind";
import { DrawerActions } from "@react-navigation/native";
import { View } from "react-native-animatable";

const StyledPressable = styled(Pressable);

export default function ImagePressableComponent({
   image,
   imageClassesStyle,
   resizeMode = "cover",
}) {
   const navigator = useNavigation();

   return (
      <StyledPressable
         className={`active:opacity-40`}
         onPress={() => navigator.dispatch(DrawerActions.openDrawer())}>
         <Image
            source={image}
            className={`w-11 h-11 ${imageClassesStyle}`}
            resizeMode={resizeMode}
         />
      </StyledPressable>
   );
}
