import { Alert, Image, Platform, ScrollView, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import images from "../../constants/images";
import FooterComponent from "../../components/FooterComponent";
import FileInputComponent from "../../components/FileInputComponent";
import LocationComponent from "../../components/LocationComponent";
import useAffairStore from "../../stores/affairStore";
import useAuthStore from "../../stores/authStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import useGlobalStore from "../../stores/globalStore";
import { FormikComponent, InputComponent } from "../../components/FormikComponents";
import { postReport } from "../../stores/reportStore";
import { SimpleToast } from "../../utils/alerts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { convertToFormData } from "../../utils/formats";
import ClockComponent from "../../components/ClockComponent";
import ScrollContentComponent from "../../components/ScrollContentComponent";
import { usePreventRemoveContext } from "@react-navigation/native";

const Report = () => {
   const navigation = useNavigation();
   const { reportname } = useLocalSearchParams();

   const { preventRemove, setPreventRemove } = usePreventRemoveContext();
   const { isLoading, setIsLoading } = useGlobalStore();

   const { auth } = useAuthStore();
   const { affair } = useAffairStore();
   // console.log("🚀 ~ Report ~ affair:", affair);
   const initialValues = {
      id: null,
      fecha_reporte: "",
      imgFile: null,
      latitud: "", //"25.5700128",
      longitud: "", //"-103.4963202",
      id_user: auth?.id,
      referencias: "",
      comentarios: "",
      id_departamento: affair.department_id,
      id_asunto: affair.asunto_id,

      address: "",
      dataLocation: null /* {
         coords: { latitude: 25.5742159, longitude: -103.4324911 },
         ubication: {
            city: "Torreón",
            country: "México",
            district: "Alamedas",
            formattedAddress: "Delio Hernández 82, Alamedas, 27110 Torreón, Coah., México",
            isoCountryCode: "MX",
            name: "82",
            postalCode: "27110",
            region: "Coahuila de Zaragoza",
            street: "Delio Hernández",
            streetNumber: "82",
            subregion: null,
            timezone: null
         }
      } */
   };
   const validationSchema = Yup.object().shape({
      imgFile: Yup.object().required("Evidencia requerida, da clic en el botón ''SUBIR EVIDENCIA''"),
      latitud: Yup.string().required("Ubicación requerida, da clic en el botón ''ESTOY AQUI''"),
      longitud: Yup.string().required("Longitud requerida"),
      referencias: Yup.string().required("Referencias requerida"),
      comentarios: Yup.string().required("Comentarios requeridos")
   });
   const onSubmit = async (values) => {
      //return console.log("🚀 ~ onSubmit ~ imgFile:", values.imgFile);
      // return console.log("🚀 ~ onSubmit ~ values:", values);
      try {
         setIsLoading(true);
         formik.setSubmitting(true);

         if (!values.imgFile) {
            setIsLoading(false);
            formik.setSubmitting(false);
            return SimpleToast("La evidencia es requerida.");
         }
         values.id_departamento = affair.department_id;
         values.id_asunto = affair.asunto_id;
         values.fecha_reporte = new Date().toISOString();

         const formData = await convertToFormData(values);
         // console.log("🚀 ~ onSubmit ~ formData:", formData);
         return console.log("🚀 ~ onSubmit ~ formData:", formData);

         const res = await postReport(formData);
         console.log("🚀 ~ onSubmit ~ res: samuel", res);
         SimpleToast(res.alert_title, "center");
         SimpleToast(`REPORTE DE [${affair.asunto}] LEVANTADO`.toUpperCase(), "center");

         formik.setSubmitting(false);
         formik.resetForm();

         setIsLoading(false);
         router.back();
      } catch (error) {
         setIsLoading(false);
         formik.setSubmitting(false);
         console.log("🚀 ~ onSubmit ~ error:", error);
         throw Error(error);
      } finally {
         formik.setSubmitting(false);
      }
   };
   const formik = useFormik({
      initialValues: initialValues,
      onSubmit: (values) => onSubmit(values),
      validationSchema: validationSchema
   });

   const handleGetPhoto = async (file) => {
      // console.log("🚀 ~ handleGetPhoto ~ file:", file);
      formik.setFieldValue("imgFile", file);
   };

   const handleGetLocation = (data) => {
      console.log("🚀 ~ handleGetLocation ~ data:", data);
      formik.setFieldValue("dataLocation", data);
      formik.setFieldValue("address", Platform.OS === "android" ? data.ubication.formattedAddress : data.ubication.street);
      formik.setFieldValue("latitud", data.coords.latitude.toString());
      formik.setFieldValue("longitud", data.coords.longitude.toString());
   };

   useEffect(() => {
      // console.log("Código useEffect Sensisho");
      navigation.setOptions({});
      setPreventRemove(true);

      return () => {
         // Limpia la prevención al desmontar
         setPreventRemove(false);
      };
   }, [navigation, reportname]);

   useFocusEffect(
      useCallback(() => {
         // Código que deseas ejecutar cuando la ruta cambie a esta pantalla
         console.log("Código que deseas ejecutar cuando la ruta cambie a esta pantalla");
         formik.resetForm();
         setPreventRemove(true);

         return () => {
            // Código que se ejecuta cuando la pantalla pierde el foco
            // console.log("Ruta inactiva");
            // Alert.alert("Cambios no guardados", "Tienes cambios sin guardar, ¿quieres salir sin guardar?", [
            //    { text: "Cancelar", style: "cancel" },
            //    {
            //       text: "Salir",
            //       style: "destructive",
            //       onPress: () => {
            //          setPreventRemove(false);
            //          navigation.goBack(); // O navega a otra pantalla
            //       }
            //    }
            // ]);
         };
      }, [])
   );

   return (
      <View className={"h-full"}>
         {/* // <View className={"h-full"}> */}
         {/* Título */}
         {/* // <HeaderComponent /> */}
         <View className={"w-full justify-center items-center mb-5 -mt-5 px-1"}>
            <Text className={"text-xl font-mextrabold mt-10 text-primary-200"}>
               Reporte: <Text className={`text-black`}>{affair?.asunto}</Text>
            </Text>
            <View className={`mt-2`}>
               <Text className={`text-xs font-msemibold flex justify-center items-end`}>
                  Fecha del reporte: <ClockComponent styleText={`text-xs`} />
               </Text>
            </View>
         </View>
         <ScrollContentComponent>
            <FormikComponent formik={formik} textBtnSubmit={"ENVIAR REPORTE"} containerStyles={`flex-1 mx-5`}>
               {/* Componente Camera */}
               <View className={`flex-row py-4 w-full`}>
                  <View className={`w-1/2 justify-center items-center border border-gray-300 rounded-2xl`}>
                     <Image
                        source={
                           formik.values.imgFile === null
                              ? images.camera
                              : {
                                 uri: formik.values.imgFile.uri
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
                     <Text className={`text-gray-500 text-center font-mmedium italic mb-2`}>Por favor captura la imagen con buena calidad</Text>
                     <FileInputComponent
                        textButton="Subir evidencia"
                        styleButton={`w-full bg-primary-200 ${formik.errors["latitud"] && "bg-red-600"}`}
                        getData={handleGetPhoto}
                     />
                     <Text className={`text-sm italic px-2 ${formik.errors["imgFile"] ? "text-red-600" : "text-gray-400"} font-mlight`}>
                        {formik.errors["imgFile"] && formik.errors["imgFile"]}
                     </Text>
                  </View>
               </View>

               {/* Componente Ubicacion */}
               <View className={`flex-row py-4 w-full`}>
                  <View className={`w-1/2 justify-center items-center`}>
                     <Image source={images.ubi} className={`w-[95%] h-28 rounded-3xl`} resizeMode="contain" />
                     <Text className={`text-gray-500 text-center font-mregular italic mb-2 px-1`}>
                        Ubicación detectada (aprox): <Text className={`font-mmedium`}>{formik.values.address}</Text>
                     </Text>
                  </View>
                  <View className={`w-1/2 justify-center items-center pl-2`}>
                     <Text className={`text-gray-500 text-center font-mmedium italic mb-2`}>Muestra tu ubicacion actual dando clic al botón</Text>
                     <LocationComponent
                        textButton="Estoy Aquí"
                        styleButton={`w-full bg-primary-200 ${formik.errors["latitud"] && "bg-red-600"}`}
                        getData={handleGetLocation}
                     />
                     <Text className={`text-sm italic px-2 ${formik.errors["latitud"] ? "text-red-600" : "text-gray-400"} font-mlight`}>
                        {formik.errors["latitud"] && formik.errors["latitud"]}
                     </Text>
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
                  hidden={true}
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
                  hidden={true}
               // keyboardType={"email-address"}
               />

               <InputComponent
                  formik={formik}
                  idName={"referencias"}
                  label={"Referencias"}
                  placeholder={"Describe el entorno para ubicar mejor el lugar..."}
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
            <FooterComponent />
         </ScrollContentComponent>
      </View>
   );
};

export default Report;
