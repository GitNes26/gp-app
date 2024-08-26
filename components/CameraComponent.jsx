import { CameraView, useCameraPermissions, Camera } from "expo-camera";
import { CameraType, FlashMode } from "expo-camera/build/legacy/Camera.types";
import { useEffect, useRef, useState } from "react";
import {
   ActivityIndicator,
   Button,
   Modal,
   StyleSheet,
   Text,
   ToastAndroid,
   TouchableOpacity,
   View,
} from "react-native";
import ButtonCompnent from "./ButtonCompnent";
import Icons, { closeIcon } from "../constants/icons";
import ImagePressableComponent from "./ImagePressableComponent";
import { Ionicons } from "@expo/vector-icons";
import IconPressableComponent from "./IconPressableComponent";
import { StatusBar } from "expo-status-bar";
import PhotoPreviewComponent from "./PhotoPreviewComponent";
import LoadingComponent from "./LoadingComponent";

export default function CameraComponent({
   textButton = "Abrir Cámara",
   styleButton,
}) {
   const sizeIcon = 26;
   const [openModal, setOpenModal] = useState(false);
   const [facing, setFacing] = useState(CameraType.back);
   const [flash, setFlash] = useState(FlashMode.off);
   const [flashIcon, setFlashIcon] = useState("flash-off-sharp");
   const [permission, requestPermission] = useCameraPermissions();
   const [photo, setPoto] = useState(null);
   const [loading, setLoading] = useState(false);
   const cameraRef = useRef(null);

   const handleOpenModal = () => setOpenModal(true);
   const handleCloseModal = () => setOpenModal(false);

   const toggleCameraFacing = () =>
      setFacing((current) =>
         current === "back" ? CameraType.front : CameraType.back,
      );

   const toggleFlash = () => {
      setFlashIcon((current) =>
         flash === "off" ? "flash-off-sharp" : "flash-sharp",
      );
      setFlash((current) => (current === "off" ? FlashMode.on : FlashMode.off));
   };

   const handleTakePhoto = async () => {
      setLoading(false);
      if (cameraRef.current) {
         setLoading(true);
         // console.log("🚀 ~ handleTakePhoto ~ cameraRef:", cameraRef.current);
         const options = {
            quiality: 1,
            base64: true,
            exif: false,
         };
         const takedPhoto = await cameraRef.current.takePictureAsync(options);
         setPoto(takedPhoto);
         setLoading(false);
      }
   };

   const handleRetakePhoto = () => setPoto(null);
   const handleApprovedPhoto = () => {
      ToastAndroid.showWithGravity(
         `IMAGEN GUARDADA`,
         ToastAndroid.LONG,
         ToastAndroid.CENTER,
      );
      setPoto(null);
   };

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

   // if (loading) return <ActivityIndicator size={"large"} />;

   return (
      <>
         <ButtonCompnent
            title={textButton}
            containerStyles={styleButton}
            handleOnPress={handleOpenModal}
         />
         <Modal
            visible={openModal}
            animationType="slide"
            className={`w-full h-full bg-black-100`}>
            {photo ? (
               <PhotoPreviewComponent
                  photo={photo}
                  handleRetakePhoto={handleRetakePhoto}
               />
            ) : (
               <View className="w-full h-full ">
                  <CameraView
                     ref={cameraRef}
                     className="flex-1 w-full h-full rounded-3xl"
                     facing={facing}
                     focusable={true}
                     autofocus="on"
                     ratio="16:9"
                     mode="picture"
                     flash={flash}>
                     {loading && <LoadingComponent text={`CARGANDO FOTO`} />}
                     <View className="flex-1 flex-col justify-between bg-transparent p-4">
                        <View className={`flex-row justify-between`}>
                           <IconPressableComponent
                              icon={
                                 <Ionicons
                                    name="close-outline"
                                    size={sizeIcon}
                                    color={"white"}
                                 />
                              }
                              backdrop={true}
                              handleOnPress={handleCloseModal}
                           />
                           <IconPressableComponent
                              icon={
                                 <Ionicons
                                    name="camera-reverse"
                                    size={sizeIcon}
                                    color={"white"}
                                 />
                              }
                              backdrop={true}
                              handleOnPress={toggleCameraFacing}
                           />
                           <IconPressableComponent
                              icon={
                                 <Ionicons
                                    name={flashIcon}
                                    size={sizeIcon}
                                    color={"white"}
                                 />
                              }
                              backdrop={true}
                              handleOnPress={toggleFlash}
                           />
                        </View>
                        <View className={`flex-row justify-center`}>
                           <IconPressableComponent
                              icon={
                                 <Ionicons
                                    name="scan-circle-outline"
                                    size={80}
                                    color={"white"}
                                 />
                              }
                              backdrop={true}
                              handleOnPress={handleTakePhoto}
                           />
                        </View>
                     </View>
                  </CameraView>
               </View>
            )}
         </Modal>
      </>
   );
}
