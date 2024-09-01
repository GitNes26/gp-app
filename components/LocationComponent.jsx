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
         longitude: currentPosition.coords.longitude,
      };
      const currentLocation = await getUbication(coords);
      return currentLocation;
   } catch (error) {
      console.log("🚀 ~ getLocation ~ error:", error);
   }
};
export const getUbication = async (coords) => {
   try {
      const ubication = await Location.reverseGeocodeAsync(coords);
      const currentLocation = {
         coords,
         ubication: ubication[0],
      };
      // setLocation(currentLocation);
      // if (getData) getData(location);
      return currentLocation;
   } catch (error) {
      console.log("🚀 ~ getLocation ~ error:", error);
   }
};

const LocationComponent = ({
   textButton = "Conocer mi ubicación",
   styleButton,
   getData,
}) => {
   const [location, setLocation] = useState({
      coords: null,
      ubication: null,
   });
   const [status, requestPermission] = Location.useBackgroundPermissions();

   const requestPermision = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("🚀 ~ requestPermision ~ status:", status);
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
      await getLocation();
   };

   const getLocation = async () => {
      try {
         const currentPosition = await Location.getCurrentPositionAsync({});
         setLocation(currentPosition);
         const coords = {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
         };
         getUbication(coords);
      } catch (error) {
         console.log("🚀 ~ getLocation ~ error:", error);
      }
   };
   const getUbication = async (coords) => {
      try {
         const ubication = await Location.reverseGeocodeAsync(coords);
         const currentLocation = {
            coords,
            ubication: ubication[0],
         };
         setLocation(currentLocation);
         if (getData) getData(location);
      } catch (error) {
         console.log("🚀 ~ getLocation ~ error:", error);
      }
   };

   useEffect(() => {
      // console.log("soy el LocationComponent");
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
