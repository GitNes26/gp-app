import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import ButtonCompnent from "../components/ButtonCompnent";
import colors from "../constants/colors";

export default function App() {
   return (
      <SafeAreaView className={"bg-primary h-full"}>
         <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View
               className={
                  "w-full justify-center items-center min-h-[85vh] px-4"
               }>
               <Image
                  source={images.logo}
                  className={"w-[130px] h-[184px]"}
                  resizeMode="contain"
               />
               <Image
                  source={images.cards}
                  className={"max-w-[380px] w-full h-[300px]"}
                  resizeMode="contain"
               />

               <View className={"relative mt-5 mx-5"}>
                  <Text className={"text-3xl text-white font-bold text-center"}>
                     Descubre lo que es congregarte en{" "}
                     <Text className={"text-secondary-200"}>Familia</Text>
                  </Text>
                  <Image
                     source={images.path}
                     className={
                        "w-[136px] h-[15px] absolute -bottom-2 -right-8"
                     }
                     resizeMode="contain"
                  />
               </View>
               <Text
                  className={
                     "text-sm font-pregular text-gray-100 mt-7 text-center"
                  }>
                  Comunidad es lo que hacemos, Familia es lo que somos!
               </Text>

               <ButtonCompnent
                  title={"Comencemos"}
                  handlePress={() => {
                     router.push("/sign-in");
                  }}
                  containerStyles={"w-full mt-7"}
               />
            </View>
         </ScrollView>
         <StatusBar
            backgroundColor={colors.primary.DEFAULT}
            style="inverted"
            animated
         />
      </SafeAreaView>
   );
}
