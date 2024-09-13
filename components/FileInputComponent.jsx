import { useEffect, useState } from "react";
import { Button, Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Camera from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import ButtonCompnent from "./ButtonCompnent";
import { convertImageToFile } from "../utils/formats";
import ModalComponent from "./ModalComponent";
import IconPressableComponent, { ItemIconText } from "./IconPressableComponent";
import { Ionicons } from "@expo/vector-icons";
import { SimpleToast } from "../utils/alerts";

export default function FileInputComponent({ textButton = "Abrir Cámara", styleButton, getData }) {
   const [status, requestPermission] = ImagePicker.useCameraPermissions();
   const [permissionsGranted, setPermissionsGranted] = useState({
      camera: false,
      mediaLibrary: false
   });
   // const [status:statusMedia, requestPermission:requestPermissionMedia] = ImagePicker.useMediaLibraryPermissions();
   const [image, setImage] = useState(null);
   const [visibleModal, setVisibleModal] = useState(false);

   const handlePick = async (resourceType) => {
      setVisibleModal(false);

      // No permissions request is necessary for launching the image library
      let result = null;

      if (resourceType === "image") {
         const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
         setPermissionsGranted({ ...permissionsGranted, mediaLibrary: mediaLibraryStatus === "granted" });
         if (mediaLibraryStatus !== "granted") return SimpleToast("Se necesita el permiso de la multimedia");

         result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [9, 16],
            quality: 1
         });
      } else if (resourceType === "photo") {
         // Solicitar permiso para la cámara
         const { status: cameraStatus } = await Camera.Camera.requestCameraPermissionsAsync();
         setPermissionsGranted({ ...permissionsGranted, camera: cameraStatus === "granted" });
         if (cameraStatus !== "granted") return SimpleToast("Se necesita el permiso de la cámara");

         result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.back,
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
            allowsEditing: true, // Permitir al usuario editar la imagen
            aspect: [4, 3], // Relación de aspecto fija (4:3)
            quality: 0.8, // Calidad de imagen (0.0 a 1.0)
            base64: true, // Opcional: obtener también la imagen en base64
            exif: true // Incluir metadatos EXIF (geolocalización, etc.)
         });
      }

      // console.log(result);

      if (!result.canceled) {
         setImage(result.assets[0].uri);
         const imgData = result.assets[0];
         const file = await convertImageToFile(imgData.uri, imgData.fileName, imgData.mimeType);
         // const data = {
         //    uri: imgData.uri,
         //    file,
         // };
         // console.log("🚀 ~ handlePick ~ file:", file);
         getData(file);
      }
   };

   return (
      <>
         <ButtonCompnent title={textButton} containerStyles={styleButton} handleOnPress={() => setVisibleModal(true)} />
         <ModalComponent visible={visibleModal} title={"Selecciona una opción"}>
            <View className={`flex-row items-center justify-evenly`}>
               <IconPressableComponent
                  icon={<ItemIconText icon={<Ionicons name={"image-outline"} size={24} />} text={"Galeria"} />}
                  styleContent={`m-1 mx-3 p-1.5 bg-gray-100/30 rounded-xl`}
                  handleOnPress={() => handlePick("image")}
               />
               <IconPressableComponent
                  icon={<ItemIconText icon={<Ionicons name={"camera-outline"} size={24} />} text={"Foto"} />}
                  styleContent={`m-1 mx-3 p-1.5 bg-gray-100/30 rounded-xl`}
                  handleOnPress={() => handlePick("photo")}
               />
               <IconPressableComponent
                  icon={<ItemIconText icon={<Ionicons name={"close"} size={24} />} text={"Cerrar"} />}
                  styleContent={`m-1 mx-3 p-1.5 bg-gray-100/10 rounded-xl`}
                  handleOnPress={() => setVisibleModal(false)}
               />
            </View>
         </ModalComponent>
      </>
   );
}
