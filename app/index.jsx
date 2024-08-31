import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import ButtonCompnent from "../components/ButtonCompnent";
import colors from "../constants/colors";
import { Foundation } from "@expo/vector-icons";
import { useEffect } from "react";
import { useColorScheme } from "nativewind";
import { useColorScheme as useColorSchemeRN } from "react-native";
import useAuthStore from "../stores/authStore";

export default function App() {
   const { colorScheme } = useColorScheme();
   const currentTheme = useColorSchemeRN();
   const { auth } = useAuthStore();

   useEffect(() => {
      // if (fontsLoaded) SplashScreen.hideAsync();
      console.log("colorScheme", colorScheme);
      console.log("currentTheme", currentTheme);
   }, [useColorScheme]);

   if (auth) return <Redirect href="(main)" />;
   // isAuth();

   return (
      <SafeAreaView className={"h-full"}>
         <ImageBackground
            source={images.bgAuth}
            className={"w-full h-full"}
            resizeMode="cover">
            <ScrollView
               contentContainerStyle={{
                  flexGrow: 1,
               }}>
               {/* <Image
                  source={images.bgAuthUp}
                  className={"w-full h-40"}
                  resizeMode="cover"
               /> */}
               <View
                  className={"w-full justify-center items-center px-4 flex-1"}>
                  <Image
                     source={images.logo}
                     className={"w-full h-20 mb-5"}
                     resizeMode="contain"
                  />
                  {/* <Image
                     source={images.cards}
                     className={"max-w-[380px] w-full h-[100px]"}
                     resizeMode="contain"
                  /> */}

                  <View className={"relative mt-5 mx-5"}>
                     <Text className={"text-3xl font-mbold text-center"}>
                        La app con estrella{" "}
                        <Foundation
                           name="star"
                           size={28}
                           color={colors.primary[200]}
                        />
                     </Text>
                     <Image
                        source={images.path}
                        className={
                           "w-[136px] h-[15px] absolute -bottom-2 -right-8"
                        }
                        resizeMode="contain"
                     />
                  </View>
                  <Text
                     className={
                        "text-sm font-regular text-gray-700 mt-1 text-center"
                     }>
                     Mejoremos nuestra ciudad
                  </Text>

                  <ButtonCompnent
                     title={"Comencemos"}
                     handleOnPress={() => {
                        router.push("/sign-in");
                     }}
                     containerStyles={"w-full mt-7"}
                  />
               </View>
            </ScrollView>
         </ImageBackground>

         <StatusBar
            backgroundColor={colors.primary[200]}
            style={colorScheme === "dark" ? "light" : "dark"}
            animated
         />
      </SafeAreaView>
   );
}
