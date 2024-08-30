import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "nativewind";
import { useColorScheme as useColorSchemeRN } from "react-native";
import LoadingComponent from "../components/LoadingComponent";
import useGlobalStore from "../stores/globalStore";
import useAuthStore from "../stores/authStore";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
   const loading = useGlobalStore((state) => state.loading);
   const setLoading = useGlobalStore((state) => state.setLoading);
   const auth = useAuthStore((state) => state.auth);

   const [fontsLoaded, error] = useFonts({
      "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
      "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
      "Montserrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
      "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
      "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
      "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
   });

   const { colorScheme } = useColorScheme();
   const currentTheme = useColorSchemeRN();

   useEffect(() => {
      if (error) throw error;
      if (fontsLoaded) SplashScreen.hideAsync();
      setLoading(false);
   }, [fontsLoaded, error]);

   useEffect(() => {
      console.log("🚀 ~ RootLayout ~ useEffect ~ auth:", auth);
   }, [auth]);

   if (!fontsLoaded && !error) return null;

   // if (loading) return;
   console.log("Value of auth before rendering:", auth);

   if (auth == null) {
      console.log("estamos en el auth");
      return (
         <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
         </Stack>
      );
   }

   return (
      <Stack>
         <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
   );
};

export default RootLayout;
