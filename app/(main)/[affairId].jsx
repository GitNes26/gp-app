import { Image, ScrollView, Text, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import HeaderComponent from "../../components/HeaderComponent";
import InputComponent from "../../components/InputComponent";
import ButtonCompnent from "../../components/ButtonCompnent";
import images from "../../constants/images";
import FooterComponent from "../../components/FooterComponent";
import CameraComponent from "../../components/CameraComponent";
import LocationComponent from "../../components/LocationComponent";
import useAffairStore from "../../stores/affairStore";

const initialValues = {
   created_at: "",
   img_evidence: "",
   lat: "",
   lon: "",
   address: "",
   ref: "",
   comments: "",
};
const Report = () => {
   const { affairId } = useLocalSearchParams();

   const { affair } = useAffairStore();
   const [formData, setFormData] = useState(initialValues);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleGetPhoto = (photo64) => {
      setFormData({ ...formData, img_evidence: photo64 });
   };

   const handleGetLocation = (data) => {
      setFormData({
         ...formData,
         address: data.ubication.formattedAddress,
         lat: data.coords.latitude.toString(),
         lon: data.coords.longitude.toString(),
      });
   };

   const onSubmit = (values) => {
      // return console.log("🚀 ~ onSubmit ~ values:", values);
      try {
         setIsSubmitting(true);
         ToastAndroid.showWithGravity(
            `REPORTE [${affair.asunto}] LEVANTADO`.toUpperCase(),
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
         );
         // setTimeout(() => {
         setIsSubmitting(false);
         router.back();
         // }, 1500);
      } catch (error) {
         console.log("🚀 ~ onSubmit ~ error:", error);
         throw Error(error);
      } finally {
         // setIsSubmitting(false);
      }
   };

   useEffect(() => {
      console.log("useEffect del reporte");
   }, []);

   // useEffect(() => {}, [formData]);

   if (!affair) return router.replace("(main)");

   return (
      <SafeAreaView className={"h-full"}>
         {/* Título */}
         <HeaderComponent />
         <View className={"w-full justify-center items-center mb-5 -mt-5"}>
            <Text className={"text-2xl font-mextrabold mt-10 text-primary-200"}>
               Reporte <Text className={`text-black`}>{affair.asunto}</Text>
            </Text>
         </View>
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 px-5">
               <InputComponent
                  title={"Fecha y hora"}
                  // value={formData.created_at}
                  // handlChangeText={(e) => setFormData({ ...formData, created_at: e })}
                  otherStyles={"mt-7"}
                  keyboardType={"datetime"}
                  placeholder={"12:00"}
               />
               <View className={`flex-row py-4 w-full`}>
                  <View
                     className={`w-1/2 justify-center items-center border border-gray-300 rounded-2xl`}>
                     <Image
                        source={
                           formData.img_evidence === ""
                              ? images.camera
                              : {
                                   uri:
                                      "data:image/jpg;base64," +
                                      formData.img_evidence,
                                }
                        }
                        className={`w-[95%] h-40 rounded-3xl`}
                        resizeMode="contain"
                     />
                  </View>
                  <View className={`w-1/2 justify-center items-center pl-2`}>
                     <Text
                        className={`text-gray-500 text-center font-mmedium italic mb-2`}>
                        Por favor captura la imagen con buena calidad
                     </Text>
                     <CameraComponent
                        textButton="Capturar evidencia"
                        styleButton={`w-full bg-primary-200`}
                        getData={handleGetPhoto}
                     />
                  </View>
               </View>
               <View className={`flex-row py-4 w-full`}>
                  <View className={`w-1/2 justify-center items-center`}>
                     <Image
                        source={images.ubi}
                        className={`w-[95%] h-28 rounded-3xl`}
                        resizeMode="contain"
                     />
                     <Text
                        className={`text-gray-500 text-center font-mregular italic mb-2 px-1`}>
                        Ubicación detectada (aprox):{" "}
                        <Text className={`font-mmedium`}>
                           {formData.address}
                        </Text>
                     </Text>
                  </View>
                  <View className={`w-1/2 justify-center items-center pl-2`}>
                     <Text
                        className={`text-gray-500 text-center font-mmedium italic mb-2`}>
                        Muestra tu ubicacion actual
                     </Text>
                     <LocationComponent
                        textButton="Estoy Aquí"
                        styleButton={`w-full bg-primary-200`}
                        getData={handleGetLocation}
                     />
                  </View>
               </View>
               <InputComponent
                  title={"Latitud"}
                  value={formData.lat}
                  // handlChangeText={(e) => setFormData({ ...formData, lat: e })}
                  otherStyles={"mt-7"}
                  keyboardType={"number"}
                  placeholder={"25.252525"}
                  readOnly={true}
               />
               <InputComponent
                  title={"Longitud"}
                  value={formData.lon}
                  // handlChangeText={(e) => setFormData({ ...formData, lon: e })}
                  otherStyles={"mt-7"}
                  keyboardType={"number"}
                  placeholder={"25.252525"}
                  readOnly={true}
               />
               <InputComponent
                  title={"Referncias"}
                  value={formData.ref}
                  handlChangeText={(e) => setFormData({ ...formData, ref: e })}
                  otherStyles={"mt-7"}
                  // keyboardType={"text"}
                  placeholder={"Describa referencias del lugar"}
                  rows={5}
               />
               <InputComponent
                  title={"Comentarios/Reporte"}
                  value={formData.comments}
                  handlChangeText={(e) =>
                     setFormData({ ...formData, comments: e })
                  }
                  otherStyles={"mt-7"}
                  // keyboardType={"text"}
                  placeholder={"Comentarios y/o reporte"}
                  rows={5}
               />
               <ButtonCompnent
                  title={"reportar"}
                  handleOnPress={onSubmit}
                  containerStyles={"mt-7 mb-5"}
                  isLoading={isSubmitting}
               />
            </View>
            <FooterComponent />
         </ScrollView>
      </SafeAreaView>
   );
};

export default Report;
