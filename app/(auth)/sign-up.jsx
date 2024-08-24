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
import { Link, router, useNavigation } from "expo-router";
import { Foundation } from "@expo/vector-icons";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";

const SignUp = () => {
   const navigation = useNavigation();
   const [form, setForm] = useState({
      username: "",
      email: "",
      password: "",
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
         navigation.goBack();
         // }, 1500);
      } catch (error) {
         console.log("🚀 ~ onSubmit ~ error:", error);
         throw Error(error);
      } finally {
         // setIsSubmitting(false);
      }
   };

   return (
      <>
         <SafeAreaView className={"h-full"}>
            <HeaderComponent isAuth={true} />
            <ScrollView
               contentContainerStyle={{
                  flexGrow: 1,
               }}>
               <View className={"w-full justify-center px-4 py-2 flex-1"}>
                  <Image
                     source={images.logo}
                     className={"w-full h-14"}
                     resizeMode="contain"
                  />
                  <View className={"w-full justify-center items-center"}>
                     <Text
                        className={
                           "text-3xl font-mbold mt-10 text-primary-200"
                        }>
                        Bienvenido!
                     </Text>
                     <Text className={"text-base font-mmedium text-gray-500"}>
                        a la App con estrella{" "}
                        <Foundation
                           name="star"
                           size={18}
                           color={colors.primary}
                        />
                     </Text>
                  </View>

                  <InputComponent
                     title={"Nombre de Usuario"}
                     value={form.username}
                     handlChangeText={(e) => setForm({ ...form, username: e })}
                     otherStyles={"mt-7"}
                     // keyboardType={""}
                     placeholder={"Ingresa tu nombre de usuario"}
                  />
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
                     title={"Registrarme"}
                     handlePress={onSubmit}
                     containerStyles={"mt-7"}
                     isLoading={isSubmitting}
                  />
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
            </ScrollView>
            <FooterComponent isAuth={true} />
         </SafeAreaView>
      </>
   );
};

export default SignUp;

const styles = StyleSheet.create({});
