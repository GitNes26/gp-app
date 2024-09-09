import {
   Image,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   Text,
   ToastAndroid,
   View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import HeaderComponent from "../../components/HeaderComponent";
import images from "../../constants/images";
import FooterComponent from "../../components/FooterComponent";
import CameraComponent from "../../components/CameraComponent";
import LocationComponent from "../../components/LocationComponent";
import useAffairStore from "../../stores/affairStore";
import useAuthStore from "../../stores/authStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import useGlobalStore from "../../stores/globalStore";
import {
   FormikComponent,
   InputComponent,
} from "../../components/FormikComonents";
import { postReport } from "../../stores/reportStore";
import { SimpleToast } from "../../utils/alerts";
import { base64ToFile } from "../../utils/formats";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Report = () => {
   const { affairId } = useLocalSearchParams();
   const { isLoading, setIsLoading } = useGlobalStore();

   const { auth } = useAuthStore();
   const { affair } = useAffairStore();
   // console.log("🚀 ~ Report ~ affair:", affair);
   const initialValues = {
      id: null,
      fecha_reporte: "",
      imgFile: null,
      imgFilePreview: null,
      latitud: "",
      longitud: "",
      id_user: auth?.id,
      referencias: "",
      comentarios: "",
      id_departamento: affair.department_id,
      id_asunto: affair.asunto_id,

      address: "",
   };
   const validationSchema = Yup.object().shape({
      latitud: Yup.string().required("Latitud requerida"),
      longitud: Yup.string().required("Longitud requerida"),
      referencias: Yup.string().required("Referencias requerida"),
      comentarios: Yup.string().required("Comentarios requeridos"),
   });
   const onSubmit = async (values) => {
      // return console.log("🚀 ~ onSubmit ~ values:", values);
      try {
         // setIsLoading(true);
         values.fecha_reporte = new Date();

         formik.setSubmitting(true);
         console.log("🚀 ~ onSubmit ~ values:", values);

         await postReport(values);
         // console.log("🚀 ~ onSubmit ~ res:", res);
         // SimpleToast(res.alert_text, "center");
         // SimpleToast(
         //    `REPORTE DE [${affair.asunto}] LEVANTADO`.toUpperCase(),
         //    "center",
         // );

         // formik.setSubmitting(false);
         // formik.resetForm();

         setIsLoading(false);
         router.back();
      } catch (error) {
         console.log("🚀 ~ onSubmit ~ error:", error);
         throw Error(error);
      } finally {
         formik.setSubmitting(false);
      }
   };
   const formik = useFormik({
      initialValues: initialValues,
      onSubmit: (values) => onSubmit(values),
      validationSchema: validationSchema,
   });

   const handleGetPhoto = async (dataFile) => {
      // console.log("🚀 ~ handleGetPhoto ~ dataFile:", dataFile);
      formik.setFieldValue("imgFilePreview", dataFile.uri);
      formik.setFieldValue("imgFile", dataFile.file);
   };

   const handleGetLocation = (data) => {
      formik.setFieldValue("address", data.ubication.formattedAddress);
      formik.setFieldValue("latitud", data.coords.latitude.toString());
      formik.setFieldValue("longitud", data.coords.longitude.toString());
   };

   useEffect(() => {
      console.log("a ver si se resetea el fgomulario");
      // formik.resetForm();
   }, []);

   return (
      <View className={"h-full"}>
         {/* // <View className={"h-full"}> */}
         {/* Título */}
         {/* // <HeaderComponent /> */}
         <View className={"w-full justify-center items-center mb-5 -mt-5"}>
            <Text className={"text-2xl font-mextrabold mt-10 text-primary-200"}>
               Reporte: <Text className={`text-black`}>{affair?.asunto}</Text>
            </Text>
         </View>
         <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            alwaysBounceVertical={true}>
            {/* <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets={true}> */}
            <FormikComponent
               formik={formik}
               textBtnSubmit={"REGISTRARME"}
               containerStyles={`mx-5`}>
               <InputComponent
                  formik={formik}
                  idName={"fecha_reporte"}
                  label={"Fecha del reporte"}
                  placeholder={"fecha actual"}
                  // helperText={"texto de ayuda"}
                  textStyleCase={false}
                  // keyboardType={"email-address"}
               />

               <View className={`flex-row py-4 w-full`}>
                  <View
                     className={`w-1/2 justify-center items-center border border-gray-300 rounded-2xl`}>
                     <Image
                        source={
                           formik.values.imgFilePreview === null
                              ? images.camera
                              : {
                                   uri: formik.values.imgFilePreview,
                                   //   uri:
                                   //      "data:image/jpg;base64," +
                                   //      formik.values.imgFilePreview,
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
                        textButton="Subir evidencia"
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
                           {formik.values.address}
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
                  formik={formik}
                  idName={"latitud"}
                  label={"Latitud"}
                  placeholder={"00.00000"}
                  // helperText={"texto de ayuda"}
                  textStyleCase={false}
                  readOnly={true}
                  // keyboardType={"email-address"}
               />
               <InputComponent
                  formik={formik}
                  idName={"longitud"}
                  label={"Longitud"}
                  placeholder={"00.00000"}
                  // helperText={"texto de ayuda"}
                  textStyleCase={false}
                  readOnly={true}
                  // keyboardType={"email-address"}
               />

               <InputComponent
                  formik={formik}
                  idName={"referencias"}
                  label={"Referencias"}
                  placeholder={
                     "Describe el entorno para ubicar mejor el lugar..."
                  }
                  // helperText={"texto de ayuda"}
                  textStyleCase={false}
                  rows={5}
                  // keyboardType={"email-address"}
               />

               <InputComponent
                  formik={formik}
                  idName={"comentarios"}
                  label={"Comentarios/Reporte"}
                  placeholder={"Describe el asunto..."}
                  // helperText={"texto de ayuda"}
                  textStyleCase={false}
                  rows={5}
                  // keyboardType={"email-address"}
               />
            </FormikComponent>
            {/* </ScrollView> */}
            <FooterComponent />
         </KeyboardAwareScrollView>
      </View>
   );
};

export default Report;
