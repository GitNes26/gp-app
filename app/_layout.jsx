import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "nativewind";
import { useColorScheme as useColorSchemeRN } from "react-native";

import * as Camera from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
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

   const [permissionsGranted, setPermissionsGranted] = useState({
      camera: false,
      mediaLibrary: false,
      location: false,
   });

   const { colorScheme } = useColorScheme();
   const currentTheme = useColorSchemeRN();

   useEffect(() => {
      if (error) throw error;
      if (fontsLoaded) SplashScreen.hideAsync();

      const requestPermissions = async () => {
         // Solicitar permiso para la cámara
         const { status: cameraStatus } =
            await Camera.Camera.requestCameraPermissionsAsync();
         const { status: locationStatus } =
            await Location.requestForegroundPermissionsAsync();
         const { status: mediaLibraryStatus } =
            await MediaLibrary.requestPermissionsAsync();

         setPermissionsGranted({
            camera: cameraStatus === "granted",
            location: locationStatus === "granted",
            mediaLibrary: mediaLibraryStatus === "granted",
         });
      };

      requestPermissions();
   }, [fontsLoaded, error]);

   if (!fontsLoaded && !error) return null;

   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="index" />
         <Stack.Screen name="(auth)" />
         <Stack.Screen name="(main)" />
      </Stack>
   );
};

export default RootLayout;
