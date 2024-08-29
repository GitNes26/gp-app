import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   ToastAndroid,
   View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import { StatusBar } from "expo-status-bar";
import colors from "../../constants/colors";
import ButtonCompnent from "../../components/ButtonCompnent";
import { Link, router } from "expo-router";
import { Foundation } from "@expo/vector-icons";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import useGlobalStore from "../../stores/globalStore";
import {
   FormikComponent,
   InputComponent,
} from "../../components/FormikComonents";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllPosts, login } from "../../stores/authStore";
import useFetch from "../../hooks/useFetch";

const SignIn = () => {
   const loading = useGlobalStore((state) => state.loading);
   const setLoading = useGlobalStore((state) => state.setLoading);

   const [formData, setFormData] = useState({
      email: "atc@gomezpalacio.gob.mx",
      password: "123456",
   });
   const formik = useFormik({
      initialValues: formData,
      onSubmit: (values) => onSubmit(values),
      validationSchema: () => validationSchemas(),
   });

   const onSubmit = async (values) => {
      // return console.log("🚀 ~ onSubmit ~ values:", values);
      try {
         setLoading(true);
         formik.setSubmitting(true);
         ToastAndroid.showWithGravity(
            `Sesión iniciada: Bienvenido ${formData.email}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
         );
         const {
            data: res,
            isLoading,
            refetch: refetchPhotos,
         } = useFetch(login(values));
         // const res = await login(values);
         console.log("🚀 ~ onSubmit ~ res:", res);
         setTimeout(() => {
            setLoading(false);
            formik.setSubmitting(false);
            // router.push("../(app)");
         }, 3500);
      } catch (error) {
         console.log("🚀 ~ onSubmit ~ error:", error);
         throw Error(error);
      } finally {
         formik.setSubmitting(false);
      }
   };

   const validationSchemas = () => {
      let validationSchema;
      // if (inputUsername)
      if (true)
         validationSchema = Yup.object().shape({
            email: Yup.string()
               .email("Formato de correo no valido")
               .required("Nombre de usario o Correo requerido"),
            password: Yup.string()
               .trim()
               .min(6, "Mínimo 6 caracteres")
               .required("Contraseña requerida"),
         });
      else
         validationSchema = Yup.object().shape({
            email: Yup.string()
               .email("Formato de correo no valido")
               .required("Nombre de usario o Correo requerido"),
            password: Yup.string()
               .trim()
               .min(6, "Mínimo 6 caracteres")
               .required("Contraseña requerida"),
         });
      return validationSchema;
   };

   return (
      <SafeAreaView className={"h-full"}>
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <HeaderComponent isAuth={true} />
            <View className={"w-full justify-center px-4 flex-1"}>
               <Image
                  source={images.logo}
                  className={"w-full h-14"}
                  resizeMode="contain"
               />
               <View className={"w-full justify-center items-center"}>
                  <Text
                     className={"text-3xl font-mbold mt-10 text-primary-200"}>
                     Bienvenido!
                  </Text>
                  <Text className={"text-base font-mmedium text-gray-500"}>
                     a la App con estrella{" "}
                     <Foundation name="star" size={18} color={colors.primary} />
                  </Text>
               </View>

               <FormikComponent formik={formik} textBtnSubmit={"INGRESAR"}>
                  <InputComponent
                     formik={formik}
                     idName={"email"}
                     label={"Correo Electrónico"}
                     placeholder={"Ingresa tu correo"}
                     // helperText={"texto de ayuda"}
                     textStyleCase={false}
                     keyboardType={"email-address"}
                  />
                  <InputComponent
                     formik={formik}
                     idName={"password"}
                     label={"Contraseña"}
                     placeholder={"Ingresa tu contraseña"}
                     helperText={"mínimo 6 caracteres"}
                     textStyleCase={null}
                     keyboardType={""}
                     isPassword={true}
                  />
               </FormikComponent>

               <View className={"justify-center pt-5 flex-row gap-2"}>
                  <Text className={"text-lg text-gray-700 font-mregular"}>
                     ¿Aun no tienes cuenta?{" "}
                     <Link
                        href={"/sign-up"}
                        className="text-lg font-msemibold text-primary">
                        Registrate
                     </Link>
                  </Text>
               </View>
            </View>
            <FooterComponent isAuth={true} />
         </ScrollView>
      </SafeAreaView>
   );
};

export default SignIn;
