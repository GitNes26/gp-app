import { Fontisto, Ionicons } from "@expo/vector-icons";
import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import {
   TouchableOpacity,
   Image,
   StyleSheet,
   View,
   ToastAndroid,
   ActivityIndicator,
   Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconPressableComponent from "./IconPressableComponent";

const LoadingComponent = ({ text }) => {
   return (
      <SafeAreaView className={"h-full fixed"}>
         <View
            className={`w-full h-full fixed bg-black-100/50 justify-center items-center`}>
            <Text className={`font-mbold text-3xl text-white mb-3`}>
               {text}
            </Text>
            <ActivityIndicator size={"large"} animating />
         </View>
      </SafeAreaView>
   );
};

export default LoadingComponent;
