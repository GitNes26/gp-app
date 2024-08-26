import { Image, ScrollView, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import HeaderComponent from "../../components/HeaderComponent";
import InputComponent from "../../components/InputComponent";
import ButtonCompnent from "../../components/ButtonCompnent";
import images from "../../constants/images";
import FooterComponent from "../../components/FooterComponent";
import CameraComponent from "../../components/CameraComponent";
import LocationComponent from "../../components/LocationComponent";

const Report = () => {
   const { reportId } = useLocalSearchParams();

   const [form, setForm] = useState({
      created_at: "",
      img_evidence: "",
      lat: "",
      lon: "",
      ref: "",
      comments: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleGetPhoto = (photo64) => {
      console.log("🚀 ~ handleGetPhoto ~ photo64:");
      setForm({ ...form, img_evidence: photo64 });
   };

   const handleGetLocation = (data) => {
      console.log("🚀 ~ handleGetLocation ~ data:", data);
   };

   const onSubmit = ({ values }) => {
      try {
         setIsSubmitting(true);
         ToastAndroid.showWithGravity(
            `REPORTE [${reportId}] LEVANTADO`,
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

   return (
      <SafeAreaView className={"h-full"}>
         {/* Título */}
         <HeaderComponent />
         <View className={"w-full justify-center items-center mb-5 -mt-5"}>
            <Text className={"text-2xl font-mextrabold mt-10 text-primary-200"}>
               Reporte <Text className={`text-black`}>{reportId}</Text>
            </Text>
         </View>
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 px-5">
               <InputComponent
                  title={"Fecha y hora"}
                  // value={form.created_at}
                  // handlChangeText={(e) => setForm({ ...form, created_at: e })}
                  otherStyles={"mt-7"}
                  keyboardType={"datetime"}
                  placeholder={"12:00"}
               />
               <View className={`flex-row py-4 w-full`}>
                  <View className={`w-1/2 justify-center items-center`}>
                     <Image
                        source={
                           form.img_evidence === ""
                              ? images.camera
                              : {
                                   uri:
                                      "data:image/jpg;base64," +
                                      form.img_evidence,
                                }
                        }
                        className={`w-[95%] h-40 rounded-3xl`}
                        resizeMode="contain"
                     />
                  </View>
                  <View className={`w-1/2 justify-center items-center`}>
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
                        className={`w-[95%] h-40 rounded-3xl`}
                        resizeMode="contain"
                     />
                  </View>
                  <View className={`w-1/2 justify-center items-center`}>
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
                  value={form.lat}
                  handlChangeText={(e) => setForm({ ...form, lat: e })}
                  otherStyles={"mt-7"}
                  keyboardType={"number"}
                  placeholder={"25.252525"}
               />
               <InputComponent
                  title={"Longitud"}
                  value={form.lon}
                  handlChangeText={(e) => setForm({ ...form, lon: e })}
                  otherStyles={"mt-7"}
                  keyboardType={"number"}
                  placeholder={"25.252525"}
               />
               <InputComponent
                  title={"Referncias"}
                  value={form.ref}
                  handlChangeText={(e) => setForm({ ...form, ref: e })}
                  otherStyles={"mt-7"}
                  // keyboardType={"text"}
                  placeholder={"Describa referencias del lugar"}
               />
               <InputComponent
                  title={"Comentarios/Reporte"}
                  value={form.comments}
                  handlChangeText={(e) => setForm({ ...form, Report: e })}
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
