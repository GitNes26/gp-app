import { useEffect, useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ButtonCompnent from "./ButtonCompnent";
import { convertImageToFile } from "../utils/formats";

export default function CameraComponent({
   textButton = "Abrir Cámara",
   styleButton,
   getData,
}) {
   const [status, requestPermission] = ImagePicker.useCameraPermissions();
   // const [status:statusMedia, requestPermission:requestPermissionMedia] = ImagePicker.useMediaLibraryPermissions();
   const [image, setImage] = useState(null);

   const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [9, 16],
         quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
         setImage(result.assets[0].uri);
         const data = result.assets[0];
         const file = await convertImageToFile(
            data.uri,
            data.fileName,
            data.mimeType,
         );
         console.log("🚀 ~ pickImage ~ file:", file);
         getData(file);
      }
   };

   const pickPhoto = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchCameraAsync({
         cameraType: ImagePicker.CameraType.back,
         mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
         allowsEditing: true, // Permitir al usuario editar la imagen
         aspect: [4, 3], // Relación de aspecto fija (4:3)
         quality: 0.8, // Calidad de imagen (0.0 a 1.0)
         base64: true, // Opcional: obtener también la imagen en base64
         exif: true, // Incluir metadatos EXIF (geolocalización, etc.)
      });

      // console.log(result);

      if (!result.canceled) {
         setImage(result.assets[0].uri);
         const imgData = result.assets[0];
         const file = await convertImageToFile(
            imgData.uri,
            imgData.fileName,
            imgData.mimeType,
         );
         const data = {
            uri: imgData.uri,
            file,
         };
         // console.log("🚀 ~ pickImage ~ data:", data);
         getData(data);
      }
   };

   return (
      <ButtonCompnent
         title={textButton}
         containerStyles={styleButton}
         handleOnPress={pickPhoto}
      />
   );
   // return (
   //    <View style={styles.container}>
   //       <ButtonCompnent
   //          title={textButton}
   //          containerStyles={styleButton}
   //          handleOnPress={pickPhoto}
   //       />
   //       {image && <Image source={{ uri: image }} style={styles.image} />}
   //    </View>
   // );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   image: {
      width: 200,
      height: 200,
   },
});
