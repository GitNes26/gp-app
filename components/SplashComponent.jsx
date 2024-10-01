import React, { useRef, useEffect } from "react";
import { Modal, Text, Image, ActivityIndicator } from "react-native";
import { StyleSheet, View, Animated } from "react-native";
import { BlurView } from "expo-blur";
import images from "../constants/images";
import useGlobalStore from "../stores/globalStore";

const SplashComponent = ({ visible, bgTrasnparent = true }) => {
   // const isLoading = useGlobalStore((state) => state.isLoading);
   // const bgTrasnparent = useGlobalStore((state) => state.bgTrasnparent);

   const topValue = useRef(new Animated.Value(-105)).current; // Para animación de entrada/salida
   const animatedValue = useRef(new Animated.Value(0)).current; // Para animar el movimiento y la rotación de un logo

   useEffect(() => {
      console.log("🚀 ~ SplashComponent ~ bgTrasnparent:", bgTrasnparent);
      // Animación de entrada
      Animated.timing(topValue, {
         toValue: 0, // Mover a top 0
         duration: 600, // Duración de la animación
         useNativeDriver: true
      }).start();
   }, [visible]);

   useEffect(() => {
      Animated.loop(
         Animated.sequence([
            Animated.timing(animatedValue, {
               toValue: 1,
               duration: 1500,
               useNativeDriver: true
            }),
            Animated.timing(animatedValue, {
               toValue: 0,
               duration: 1500,
               useNativeDriver: true
            })
         ])
      ).start();
   }, [visible]);

   const logoStyle = {
      transform: [
         {
            translateX: animatedValue.interpolate({
               inputRange: [0, 1],
               outputRange: [50, -50]
            })
         },
         {
            translateY: animatedValue.interpolate({
               inputRange: [0, 1],
               outputRange: [50, -50]
            })
         },
         {
            rotate: animatedValue.interpolate({
               inputRange: [0, 1],
               outputRange: ["5deg", "0deg"]
            })
         }
      ]
   };

   return (
      <Modal transparent={true} animationType={"slide"} visible={visible} onRequestClose={false}>
         <View style={[styles.containerLoader, { backgroundColor: bgTrasnparent ? "rgba(4, 26, 7, 0.80)" : "rgba(52, 128, 63, 1)" }]}>
            <BlurView intensity={0} style={styles.containerBlur}>
               <Animated.View style={[styles.containerLoaderAction, { transform: [{ translateY: topValue }] }]}>
                  {/* <View style={styles.boxLogo}>/* Aquí va el logo o cualquier contenido * /</View> */}
                  <Animated.View style={[styles.boxLogo, logoStyle]} className={"flex justify-center items-center"}>
                     <Image source={bgTrasnparent ? images.logoGray : images.logo} className={"w-52 h-36"} resizeMode="contain" />
                     {/* <img src={logo} alt="LogoGPD" width={"300vw"} /> */}
                     <Text className={`font-mbold text-4xl text-white mb-5`}>CARGANDO...</Text>
                     <ActivityIndicator size={"large"} animating={true} color={"white"} />
                  </Animated.View>
               </Animated.View>
            </BlurView>
         </View>
      </Modal>
   );
};

const styles = StyleSheet.create({
   containerLoader: {
      width: "100%",
      height: "105%",
      position: "absolute", // No existe 'fixed', usamos 'absolute'
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: blur ?"transparent":"rgba(52, 128, 63, 1)", // verde,
      top: 0 // Inicia fuera de la pantalla en la animación
   },
   containerBlur: {
      height: "100%",
      width: "100%"
      // backgroundColor: "rgba(4, 26, 7, 0.56)"
   },
   containerLoaderAction: {
      width: "100%",
      height: "105%",
      position: "absolute",
      alignItems: "center",
      justifyContent: "center"
   },
   boxLogo: {
      // Los estilos de la caja del logo
      textAlign: "center"
   }
});

export default SplashComponent;
