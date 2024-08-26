// import { Image, ScrollView, Text, ToastAndroid, View } from "react-native";
// import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import FooterComponent from "../../../components/FooterComponent";
// import HeaderComponent from "../../../components/HeaderComponent";
// import InputComponent from "../../../components/InputComponent";
// import { router } from "expo-router";
// import ButtonCompnent from "../../../components/ButtonCompnent";
// import images from "../../../constants/images";

// const Report = () => {
//    const [form, setForm] = useState({
//       created_at: "",
//       img_evidence: "",
//       lat: "",
//       lon: "",
//       ref: "",
//       comments: "",
//    });
//    const [isSubmitting, setIsSubmitting] = useState(false);

//    const onSubmit = ({ values }) => {
//       try {
//          setIsSubmitting(true);
//          ToastAndroid.showWithGravity(
//             `REPORTE LEVANTADO`,
//             ToastAndroid.LONG,
//             ToastAndroid.CENTER,
//          );
//          // setTimeout(() => {
//          setIsSubmitting(false);
//          router.back();
//          // }, 1500);
//       } catch (error) {
//          console.log("🚀 ~ onSubmit ~ error:", error);
//          throw Error(error);
//       } finally {
//          // setIsSubmitting(false);
//       }
//    };

//    return (
//       <SafeAreaView className={"h-full "}>
//          <HeaderComponent />
//          {/* Título */}
//          <View className={"w-full justify-center items-center mb-5"}>
//             <Text className={"text-3xl font-mblack mt-10 text-primary-200"}>
//                Reporte <Text className={`text-black`}>Bacheo[asunto]</Text>
//             </Text>
//          </View>
//          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//             <View className="flex-1 px-5">
//                <InputComponent
//                   title={"Fecha y hora"}
//                   value={form.created_at}
//                   handlChangeText={(e) => setForm({ ...form, created_at: e })}
//                   otherStyles={"mt-7"}
//                   keyboardType={"datetime"}
//                   placeholder={"12:00"}
//                />
//                <View className={`flex-row py-4 w-full`}>
//                   <View className={`w-1/2 justify-center items-center`}>
//                      <Image
//                         source={images.camera}
//                         className={`w-32 h-32`}
//                         resizeMode="contain"
//                      />
//                   </View>
//                   <View className={`w-1/2 justify-center items-center`}>
//                      <Text
//                         className={`text-gray-500 text-center font-mmedium italic mb-2`}>
//                         Por favor captura la imagen con buena calidad
//                      </Text>
//                      <ButtonCompnent
//                         title={"Capturar evidencia"}
//                         containerStyles={`w-full bg-primary-200`}
//                      />
//                   </View>
//                </View>
//                <View className={`flex-row py-4 w-full`}>
//                   <View className={`w-1/2 justify-center items-center`}>
//                      <Image
//                         source={images.ubi}
//                         className={`w-32 h-32`}
//                         resizeMode="contain"
//                      />
//                   </View>
//                   <View className={`w-1/2 justify-center items-center`}>
//                      <Text
//                         className={`text-gray-500 text-center font-mmedium italic mb-2`}>
//                         Muestra tu ubicacion actual
//                      </Text>
//                      <ButtonCompnent
//                         title={"Estoy Aquí"}
//                         containerStyles={`w-full bg-primary-200`}
//                      />
//                   </View>
//                </View>
//                <InputComponent
//                   title={"Latitud"}
//                   value={form.lat}
//                   handlChangeText={(e) => setForm({ ...form, lat: e })}
//                   otherStyles={"mt-7"}
//                   keyboardType={"number"}
//                   placeholder={"25.252525"}
//                />
//                <InputComponent
//                   title={"Longitud"}
//                   value={form.lon}
//                   handlChangeText={(e) => setForm({ ...form, lon: e })}
//                   otherStyles={"mt-7"}
//                   keyboardType={"number"}
//                   placeholder={"25.252525"}
//                />
//                <InputComponent
//                   title={"Referncias"}
//                   value={form.ref}
//                   handlChangeText={(e) => setForm({ ...form, ref: e })}
//                   otherStyles={"mt-7"}
//                   // keyboardType={"text"}
//                   placeholder={"Describa referencias del lugar"}
//                />
//                <InputComponent
//                   title={"Comentarios/Reporte"}
//                   value={form.comments}
//                   handlChangeText={(e) => setForm({ ...form, Report: e })}
//                   otherStyles={"mt-7"}
//                   // keyboardType={"text"}
//                   placeholder={"Comentarios y/o reporte"}
//                />
//                <ButtonCompnent
//                   title={"reportar"}
//                   handleOnPress={onSubmit}
//                   containerStyles={"mt-7 mb-5"}
//                   isLoading={isSubmitting}
//                />
//             </View>
//          </ScrollView>
//          <FooterComponent />
//          {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
//       </SafeAreaView>
//    );
// };

// export default Report;
