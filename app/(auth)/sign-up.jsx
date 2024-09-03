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
import { Link, router, useNavigation } from "expo-router";
import { Foundation } from "@expo/vector-icons";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import {
   FormikComponent,
   InputComponent,
   RadioButtonComponent,
} from "../../components/FormikComonents";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
   const navigation = useNavigation();

   const [formData, setFormData] = useState({
      email: "atc@gomezpalacio.gob.mx",
      password: "123456",
   });
   const validationSchema = Yup.object().shape({
      email: Yup.string()
         .email("Formato de correo no valido")
         .required("Nombre de usario o Correo requerido"),
      password: Yup.string()
         .trim()
         .min(6, "Mínimo 6 caracteres")
         .required("Contraseña requerida"),
   });

   const formik = useFormik({
      initialValues: formData,
      onSubmit: (values) => onSubmit(values),
      validationSchema: () => validationSchemas(),
   });
   const [isSubmitting, setIsSubmitting] = useState(false);

   const onSubmit = ({ values }) => {
      console.log("🚀 ~ onSubmit ~ values:", values);
      try {
         setIsSubmitting(true);
         ToastAndroid.showWithGravity(
            `Cuenta creada: Bienvenido ${form.username}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
         );
         // setTimeout(() => {
         setIsSubmitting(false);
         navigation.canGoBack() && navigation.goBack();
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
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <HeaderComponent isAuth={true} />
            <View className={"w-full justify-center px-4 py-2 flex-1"}>
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

               <FormikComponent formik={formik} textBtnSubmit={"REGISTRARME"}>
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
                  <InputComponent
                     formik={formik}
                     idName={"phone"}
                     label={"Teléfono"}
                     placeholder={"Ingresa tu número a 10 dígitos"}
                     // helperText={"texto de ayuda"}
                     // textStyleCase={false}
                     keyboardType={"phone-pad"}
                  />
                  <InputComponent
                     formik={formik}
                     idName={"name"}
                     label={"Nombre(s)"}
                     placeholder={"Ingresa tu(s) nombre(s)"}
                     // helperText={"texto de ayuda"}
                     textStyleCase={true}
                     // keyboardType={""}
                  />
                  <InputComponent
                     formik={formik}
                     idName={"name"}
                     label={"Apellido Paterno"}
                     placeholder={"Ingresa tu apellido paterno"}
                     // helperText={"texto de ayuda"}
                     textStyleCase={true}
                     // keyboardType={""}
                  />
                  <InputComponent
                     formik={formik}
                     idName={"name"}
                     label={"Apellido Materno"}
                     placeholder={"Ingresa tu apellido materno"}
                     // helperText={"texto de ayuda"}
                     textStyleCase={true}
                     // keyboardType={""}
                  />
                  <InputComponent
                     formik={formik}
                     idName={"curp"}
                     label={"CURP"}
                     placeholder={"Ingresa tu CURP"}
                     // helperText={"texto de ayuda"}
                     textStyleCase={true}
                     keyboardType={""}
                  />
                  <RadioButtonComponent
                     formik={formik}
                     idName={"name"}
                     label={"Nombre(s)"}
                     placeholder={"Ingresa tu(s) nombre(s)"}
                     // helperText={"texto de ayuda"}
                     textStyleCase={false}
                     keyboardType={"phone-pad"}
                  />
               </FormikComponent>

               <View className={"justify-center pt-5 flex-row gap-2"}>
                  <Text className={"text-lg text-gray-700 font-mregular"}>
                     Si ya tienes cuenta,{" "}
                     <Link
                        href={"/sign-in"}
                        className="text-lg font-msemibold text-primary">
                        Inicia Sesión
                     </Link>
                  </Text>
               </View>
            </View>
            <FooterComponent isAuth={true} />
         </ScrollView>
      </SafeAreaView>
   );
};

export default SignUp;

const styles = StyleSheet.create({});
