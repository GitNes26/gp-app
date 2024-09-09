import { CameraView, useCameraPermissions } from "expo-camera";
import { CameraType, FlashMode } from "expo-camera/build/legacy/Camera.types";
import { useRef, useState } from "react";
import { Button, Modal, Text, ToastAndroid, View } from "react-native";
import ButtonCompnent from "./ButtonCompnent";
import { Ionicons } from "@expo/vector-icons";
import IconPressableComponent from "./IconPressableComponent";
import PhotoPreviewComponent from "./PhotoPreviewComponent";
import LoadingComponent from "./LoadingComponent";

export default function CameraComponent2({
   textButton = "Abrir Cámara",
   styleButton,
   getData,
}) {
   const sizeIcon = 26;
   const [openModal, setOpenModal] = useState(false);
   const [facing, setFacing] = useState(CameraType.back);
   const [flash, setFlash] = useState(FlashMode.off);
   const [flashIcon, setFlashIcon] = useState("flash-off-sharp");
   const [permission, requestPermission] = useCameraPermissions();
   const [photo, setPoto] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(false);
      if (cameraRef.current) {
         setIsLoading(true);
         // console.log("🚀 ~ handleTakePhoto ~ cameraRef:", cameraRef.current);
         const options = {
            quiality: 1,
            base64: true,
            exif: false,
         };
         const takedPhoto = await cameraRef.current.takePictureAsync(options);
         setPoto(takedPhoto);
         setIsLoading(false);
      }
   };

   const handleRetakePhoto = () => setPoto(null);
   const handleApprovedPhoto = async () => {
      ToastAndroid.showWithGravity(
         `IMAGEN APROBADA`,
         ToastAndroid.LONG,
         ToastAndroid.CENTER,
      );
      console.log("🚀 ~ handleApprovedPhoto ~ photo.base64:", photo.base64);
      await getData(photo.base64);
      setPoto(null);
      setOpenModal(false);
   };

   if (!permission) {
      // Camera permissions are still isLoading.
      return <View />;
   }

   if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
         <View>
            <Text className={`text-center`}>
               Necesitas permitir el uso de la cámara
            </Text>
            <ButtonCompnent
               title={"CONCEDER PERMISO"}
               containerStyles={styleButton}
               handleOnPress={requestPermission}
            />
         </View>
      );
   }

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
                  handleApprovedPhoto={handleApprovedPhoto}
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
                     {isLoading && <LoadingComponent text={`CARGANDO FOTO`} />}
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
                                    name="aperture-outline"
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
