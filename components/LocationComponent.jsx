import { useEffect, useState } from "react";
import ButtonCompnent from "./ButtonCompnent";
import * as Location from "expo-location";
import { Alert, ToastAndroid } from "react-native";
import LoadingComponent from "./LoadingComponent";

export const getLocation = async () => {
   try {
      const currentPosition = await Location.getCurrentPositionAsync({});

      // setLocation(currentPosition);
      const coords = {
         latitude: currentPosition.coords.latitude,
         longitude: currentPosition.coords.longitude
      };
      const currentLocation = await getUbication(coords);
      return currentLocation;
   } catch (error) {
      console.log("🚀 ~ EXPORT getLocation ~ error:", error);
   }
};
export const getUbication = async (coords) => {
   try {
      const ubication = await Location.reverseGeocodeAsync(coords);
      const currentLocation = {
         coords,
         ubication: ubication[0]
      };
      // setLocation(currentLocation);
      // if (getData) getData(location);
      return currentLocation;
   } catch (error) {
      console.log("🚀 ~ EXPORT getUbication ~ error:", error);
   }
};

export const requesPermissionLocation = async () => {
   const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
   if (locationStatus !== "granted") {
      SimpleToast("Se necesita el permiso de Localidad");
      return false;
   }
   return true;
};

const LocationComponent = ({ textButton = "Conocer mi ubicación", styleButton, getData }) => {
   const [location, setLocation] = useState({
      coords: null,
      ubication: null
   });
   const [permissionsGranted, setPermissionsGranted] = useState({
      location: false
   });
   const [status, requestPermission] = Location.useBackgroundPermissions();
   const [isLoading, setIsLoading] = useState(false);

   const requestPermision = async () => {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("🚀 ~ requestPermision ~ status:", status);
      if (status !== Location.PermissionStatus.GRANTED) {
         return Alert.alert(`SOLICITAR PERMISO`, "Esta aplicación necesita acceso a la ubicación para funcionar correctamente. ¿Deseas conceder los permisos?", [
            {
               text: "Cancelar",
               onPress: () => console.log("Permisos denegados"),
               style: "cancel"
            },
            { text: "OK", onPress: () => requestPermision() }
         ]);
      }
      await getLocation();
      setIsLoading(false);
   };

   const getLocation = async () => {
      try {
         const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
         setPermissionsGranted({ ...permissionsGranted, location: locationStatus === "granted" });
         if (locationStatus !== "granted") return SimpleToast("Se necesita el permiso de Localidad");

         setIsLoading(true);
         const currentPosition = await Location.getCurrentPositionAsync({});
         setLocation(currentPosition);
         const coords = {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude
         };
         const currentLocation = await getUbication(coords);
         setIsLoading(false);
         if (getData) getData(currentLocation);
      } catch (error) {
         console.log("🚀 ~ getLocation ~ error:", error);
      }
   };
   const getUbication = async (coords) => {
      try {
         const ubication = await Location.reverseGeocodeAsync(coords);
         const currentLocation = {
            coords,
            ubication: ubication[0]
         };
         setLocation(currentLocation);
         return currentLocation;
      } catch (error) {
         console.log("🚀 ~ getUbication ~ error:", error);
      }
   };

   // useEffect(() => {
   // console.log("soy el LocationComponent");
   // requestPermision();
   // }, []);

   return (
      <>
         <ButtonCompnent isLoading={isLoading} colorisLoading="white" title={textButton} containerStyles={styleButton} handleOnPress={getLocation} />
      </>
   );
};

export default LocationComponent;
