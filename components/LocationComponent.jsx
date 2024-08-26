import { useEffect, useState } from "react";
import ButtonCompnent from "./ButtonCompnent";
import * as Location from "expo-location";
import { Alert, ToastAndroid } from "react-native";
import LoadingComponent from "./LoadingComponent";

const LocationComponent = ({
   textButton = "Conocer mi ubicación",
   styleButton,
   getData,
}) => {
   const [location, setLocation] = useState(null);
   const [status, requestPermission] = Location.useBackgroundPermissions();
   console.log("🚀 ~ status:", status);

   const requestPermision = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      // requestPermision(status);
      console.log("🚀 ~ requestPermision ~ status:", status);
      if (status !== Location.PermissionStatus.GRANTED) {
         return Alert.alert(
            `SOLICITAR PERMISO`,
            "Esta aplicación necesita acceso a la ubicación para funcionar correctamente. ¿Deseas conceder los permisos?",
            [
               {
                  text: "Cancelar",
                  onPress: () => console.log("Permisos denegados"),
                  style: "cancel",
               },
               { text: "OK", onPress: () => requestPermision() },
            ],
         );
      }
      // Obtener la ubicación actual
      // console.log("🚀 ~ requestPermision ~ Obtener la ubicación actual:");
      // let location = await Location.getLastKnownPositionAsync({});
      // setLocation(location);
      // console.log("🚀 ~ requestPermision ~ location:", location);
      // await getLocation();
   };

   const getLocation = async () => {
      try {
         console.log("🚀 ~ getLocation ~ getLocation: status", status);
         console.log("🚀 ~ PROCESANDO LOCACION...");
         const currentLocation = await Location.getCurrentPositionAsync({});
         console.log("🚀 ~ FIN");
         setLocation(currentLocation);
         console.log("Location:");
         console.log(currentLocation);
      } catch (error) {
         console.log("🚀 ~ getLocation ~ error:", error);
      }
   };
   const handleGetData = async () => {
      if (getData) getData(location);
      try {
         console.log("🚀 ~ handleGetData ~ click");
         // const currentLocation = await Location.reverseGeocodeAsync({
         //    latitude: location.coords.latitude,
         //    longitude: location.coords.longitude,
         // });
         // setLocation(currentLocation);
         // console.log("Location:");
         // console.log(currentLocation);
      } catch (error) {
         console.log("🚀 ~ getLocation ~ error:", error);
      }
   };

   useEffect(() => {
      console.log("soy el LocationComponent");
      requestPermision();
   }, []);

   return (
      <>
         {/* <LoadingComponent /> */}

         <ButtonCompnent
            title={textButton}
            containerStyles={styleButton}
            handleOnPress={getLocation}
         />
      </>
   );
};

export default LocationComponent;
