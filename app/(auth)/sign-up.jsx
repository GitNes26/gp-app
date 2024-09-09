import {
   Image,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   StyleSheet,
   Text,
   View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import colors from "../../constants/colors";
import { Link, router } from "expo-router";
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
import useGlobalStore from "../../stores/globalStore";
import { signup } from "../../stores/authStore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUp = () => {
   const { setIsLoading } = useGlobalStore();

   const initialValues = {
      id: null,
      email: "",
      password: "",
      role_id: 3,
      phone: "",
      name: "",
      paternal_last_name: "",
      maternal_last_name: "",
      curp: "",
      sexo: "",
   };
   const validationSchema = Yup.object().shape({
      email: Yup.string()
         .email("Formato de correo no valido")
         .required("Correo requerido"),
      password: Yup.string()
         .trim()
         .min(6, "Mínimo 6 caracteres")
         .required("Contraseña requerida"),
      phone: Yup.string()
         .min(10, "El número telefónico debe ser a 10 digitos")
         .required("Teléfono requerido"),
      name: Yup.string().required("Nombre(s) requerido(s)"),
      paternal_last_name: Yup.string().required("Apellido Paterno requerido"),
      maternal_last_name: Yup.string().required("Apellido Materno requerido"),
      curp: Yup.string()
         .matches(
            /^[A-Z]{4}[0-9]{6}[HM][A-Z]{2}[A-Z0-9]{4}[0-9]{1}$/,
            "Formato de CURP invalido",
         )
         .required("CURP requerido"),
      sexo: Yup.string().trim().required("Género requerido"),
   });
   const onSubmit = async (values) => {
      // console.log("🚀 ~ onSubmit ~ values:", values);
      try {
         setIsLoading(true);
         formik.setSubmitting(true);

         const res = await signup(values);

         formik.setSubmitting(false);
         if (!res.status) return setIsLoading(false);
         formik.resetForm();
         setIsLoading(false);
         router.replace("/sign-in");
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

   return (
      <SafeAreaView className={"h-full"}>
         <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            alwaysBounceVertical={true}>
            <HeaderComponent isAuth={true} />
            {/* <ScrollView
               contentContainerStyle={{ flexGrow: 1 }}
               keyboardShouldPersistTaps="handled"
               automaticallyAdjustKeyboardInsets={true}> */}
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
                     maxLength={10}
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
                     idName={"paternal_last_name"}
                     label={"Apellido Paterno"}
                     placeholder={"Ingresa tu apellido paterno"}
                     // helperText={"texto de ayuda"}
                     textStyleCase={true}
                     // keyboardType={""}
                  />
                  <InputComponent
                     formik={formik}
                     idName={"maternal_last_name"}
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
                     idName={"sexo"}
                     label={"Género"}
                     options={[
                        { label: "Hombre", value: "M" },
                        { label: "Mujer", value: "F" },
                     ]}
                     // helperText={""}
                     // horizontal={true}
                     textStyleCase={false}
                     // isLoading={true}
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
            {/* </ScrollView> */}
            <FooterComponent isAuth={true} />
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
};

export default SignUp;
