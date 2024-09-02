import React, { useEffect } from "react";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "nativewind";
import { useColorScheme as useColorSchemeRN } from "react-native";
import useGlobalStore from "../stores/globalStore";
import useAuthStore from "../stores/authStore";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
   const { loading, setLoading } = useGlobalStore();

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

   if (!fontsLoaded && !error) return null;

   // if (loading) return;

   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="index" />
         <Stack.Screen name="(auth)" />
         <Stack.Screen name="(main)" />
      </Stack>
   );
};

export default RootLayout;
