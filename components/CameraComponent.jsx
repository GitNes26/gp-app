import { CameraView, useCameraPermissions, Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/legacy/Camera.types";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonCompnent from "./ButtonCompnent";

export default function CameraComponent() {
   const [facing, setFacing] = useState(CameraType.back);
   const [permission, requestPermission] = useCameraPermissions();

   if (!permission) {
      // Camera permissions are still loading.
      return <View />;
   }

   if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
         <View style={styles.container}>
            <Text style={styles.message}>
               We need your permission to show the camera
            </Text>
            <Button onPress={requestPermission} title="grant permission" />
         </View>
      );
   }

   function toggleCameraFacing() {
      setFacing((current) => (current === "back" ? "front" : "back"));
   }

   return (
      <View className={`flex-1 justify-center items-center`}>
         <CameraView className={`flex-1`} facing={facing}>
            <View className={`flex-1 flex-row bg-transparent`}>
               <ButtonCompnent
                  containerStyles={`flex-1 align-self-end align-items-center`}
                  textStyles={`text-sm font-mbold`}
                  title={"Cambiar cámara"}
                  handlePress={toggleCameraFacing}
               />
               {/* <TouchableOpacity
                  style={styles.button}
                  onPress={toggleCameraFacing}>
                  <Text style={styles.text}>Flip Camera</Text>
               </TouchableOpacity> */}
            </View>
         </CameraView>
      </View>
   );
}

const styles = StyleSheet.create({
   message: {
      textAlign: "center",
      paddingBottom: 10,
   },
   buttonContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent",
      margin: 64,
   },
   button: {
      flex: 1,
      alignSelf: "flex-end",
      alignItems: "center",
   },
   text: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
   },
});

// import { useEffect, useRef, useState } from "react";
// import { Text, View } from "react-native";
// import { Camera, CameraType } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";

// export const CameraComponent = () => {
//    // const [hasCameraPermission, setHasCameraPermission] = useState(false);
//    // const [image, setimage] = useState(null);
//    // const [type, setType] = useState(Camera.);
//    // const [flash, setFlash] = useState(Camera.Constant.FlashMode.off);
//    const cameraRef = useRef(null);

//    const [permission, requestPermission] = Camera.useCameraPermissions();

//    useEffect(() => {
//       (async () => {
//          MediaLibrary.requestPermissionsAsync(); //Permiso para acceder a la libreria
//          const cameraStatus = await Camera.requestCameraPermissionsAsync();
//          setHasCameraPermission(cameraStatus.status === "granted");
//       })();
//    }, []);

//    return (
//       <View className={`bg-slate-600`}>
//          <Camera className={`bg-red-400`} ref={cameraRef}>
//             <Text>Soy la camara</Text>
//          </Camera>
//       </View>
//    );
// };
