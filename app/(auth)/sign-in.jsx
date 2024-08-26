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
import InputComponent from "../../components/InputComponent";
import colors from "../../constants/colors";
import ButtonCompnent from "../../components/ButtonCompnent";
import { Link, router } from "expo-router";
import { Foundation } from "@expo/vector-icons";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";

const SignIn = () => {
   const [form, setForm] = useState({
      email: "",
      password: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);

   const onSubmit = ({ values }) => {
      try {
         setIsSubmitting(true);
         ToastAndroid.showWithGravity(
            `Sesión iniciada: Bienvenido ${form.email}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
         );
         // setTimeout(() => {
         setIsSubmitting(false);
         router.push("../(app)");
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

               <InputComponent
                  title={"Correo Electrónico"}
                  value={form.email}
                  handlChangeText={(e) => setForm({ ...form, email: e })}
                  otherStyles={"mt-7"}
                  keyboardType={"email-address"}
                  placeholder={"Ingresa tu correo"}
               />
               <InputComponent
                  title={"Contraseña"}
                  value={form.password}
                  handlChangeText={(e) => setForm({ ...form, password: e })}
                  otherStyles={"mt-7"}
                  // keyboardType={""}
                  isPassword={true}
                  placeholder={"Ingresa tu contraseña"}
               />
               <ButtonCompnent
                  title={"Ingresar"}
                  handleOnPress={onSubmit}
                  containerStyles={"mt-7"}
                  isLoading={isSubmitting}
               />
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

const styles = StyleSheet.create({});
