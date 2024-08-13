import {
   Alert,
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

const SignUp = () => {
   const [form, setForm] = useState({
      username: "",
      email: "",
      password: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);

   const onSubmit = ({ values }) => {
      try {
         ToastAndroid.showWithGravity(
            `Cuenta creada: Bienvenido ${form.username}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
         );
         setTimeout(() => {
            router.dismissAll();
         }, 1500);
      } catch (error) {
         console.log("🚀 ~ onSubmit ~ error:", error);
         throw Error;
      }
   };

   return (
      <SafeAreaView className={"bg-primary h-full"}>
         <ScrollView>
            <View className={"w-full justify-center min-h-[85vh] px-4 my-6"}>
               <Image
                  source={images.logo}
                  className={"w-[115px] h-[35px]"}
                  resizeMode="contain"
               />
               <Text className={"text-2xl text-white font-psemibold mt-10"}>
                  Registrate en ComuApp
               </Text>

               <InputComponent
                  title={"Usuario"}
                  value={form.username}
                  handlChangeText={(e) => setForm({ ...form, username: e })}
                  otherStyles={"mt-10"}
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
                  placeholder={"Ingresa tu correo"}
               />
               <ButtonCompnent
                  title={"Ingresar"}
                  handlePress={onSubmit}
                  containerStyles={"mt-7"}
                  isLoading={isSubmitting}
               />
               <View className={"justify-center pt-5 flex-row gap-2"}>
                  <Text className={"text-lg text-gray-100 font-pregular"}>
                     Si ya tienes cuenta,{" "}
                     <Link
                        href={"/sign-in"}
                        className="text-lg font-psemibold text-secondary">
                        Inicia Sesión
                     </Link>
                  </Text>
               </View>
            </View>
         </ScrollView>
         {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
      </SafeAreaView>
   );
};

export default SignUp;

const styles = StyleSheet.create({});
