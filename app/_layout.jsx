import React, { useEffect, useState } from "react";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "nativewind";
import { Appearance, useColorScheme as useColorSchemeRN } from "react-native";

import * as Camera from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import useAuthStore from "../stores/authStore";
import SplashComponent from "../components/SplashComponent";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
   const [appIsReady, setAppIsReady] = useState(true);
   const { auth, isLoggedIn } = useAuthStore();

   const [fontsLoaded, error] = useFonts({
      "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
      "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
      "Montserrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
      "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
      "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
      "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf")
   });

   const [permissionsGranted, setPermissionsGranted] = useState({
      camera: false,
      mediaLibrary: false,
      location: false
   });

   // const { colorScheme } = useColorScheme();
   // const currentTheme = useColorSchemeRN();
   // Hook para detectar si el sistema operativo está en modo oscuro o claro
   const colorScheme = useColorSchemeRN();
   // Hook de nativewind para aplicar estilos con TailwindCSS
   const { colorScheme: nativeWindColorScheme } = useColorScheme();
   console.log("🚀 ~ RootLayout ~ colorScheme:", colorScheme);
   console.log("🚀 ~ RootLayout ~ nativeWindColorScheme:", nativeWindColorScheme);

   // Estado para almacenar el tema actual del sistema
   const [theme, setTheme] = useState(Appearance.getColorScheme());

   useEffect(() => {
      SplashScreen.hideAsync();
      setAppIsReady(true);

      // Listener para detectar cambios en el esquema de colores del sistema
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
         setTheme(theme);
      });
      console.log("🚀 ~ subscription ~ colorScheme:", theme);

      // Limpieza del listener cuando el componente se desmonta
      return () => subscription.remove();
   }, []);

   useEffect(() => {
      console.log("🚀 ~ useEffect ~ useEffect: segundo");
      (async () => {
         // console.log("auth", auth);
         // console.log("isLoggedIn", isLoggedIn);

         if (error) throw error;
         if (fontsLoaded) SplashScreen.hideAsync();

         await (async () => {
            // Solicitar permiso para la cámara
            const { status: cameraStatus } = await Camera.Camera.requestCameraPermissionsAsync();
            const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
            const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();

            setPermissionsGranted({
               camera: cameraStatus === "granted",
               location: locationStatus === "granted",
               mediaLibrary: mediaLibraryStatus === "granted"
            });
         })();
         setTimeout(() => {
            setAppIsReady(false);
         }, 1500);
      })();
   }, [fontsLoaded, error]);

   if (!fontsLoaded && !error) return null;

   return (
      <>
         <SplashComponent visible={appIsReady} bgTrasnparent={false} />
         <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(main)" />
         </Stack>
      </>
   );

   // if (auth && isLoggedIn) {
   //    console.log("lo tengo todo");
   //    return (
   //       <Stack screenOptions={{ headerShown: false }}>
   //          <Stack.Screen name="(main)" />
   //       </Stack>
   //    );
   // }

   // return (
   //    <Stack screenOptions={{ headerShown: false }}>
   //       <Stack.Screen name="index" />
   //       <Stack.Screen name="(auth)" />
   //    </Stack>
   // );
};

export default RootLayout;
