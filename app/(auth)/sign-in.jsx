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
         router.push("/home");
         // }, 1500);
      } catch (error) {
         console.log("🚀 ~ onSubmit ~ error:", error);
         throw Error("buyuu");
      } finally {
         // setIsSubmitting(false);
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
                  Ingresa a ComuApp
               </Text>

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
                     ¿Aun no tienes cuenta?{" "}
                     <Link
                        href={"/sign-up"}
                        className="text-lg font-psemibold text-secondary">
                        Registrate
                     </Link>
                  </Text>
               </View>
            </View>
         </ScrollView>
         {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
      </SafeAreaView>
   );
};

export default SignIn;

const styles = StyleSheet.create({});
