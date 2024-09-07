import {
   Image,
   ScrollView,
   Text,
   ToastAndroid,
   TouchableOpacity,
   View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "../../../hooks/useFetch";
import { getAllPhotos } from "../../../contexts/GlobalContext";
import FooterComponent from "../../../components/FooterComponent";
import HeaderComponent from "../../../components/HeaderComponent";
import { Ionicons } from "@expo/vector-icons";
import images from "../../../constants/images";
import colors from "../../../constants/colors";
import useAuthStore from "./../../../stores/authStore";
import IconPressableComponent from "./../../../components/IconPressableComponent";
import { formatDatetime, formatPhone } from "../../../utils/formats";

const Profile = () => {
   const { auth } = useAuthStore();

   const [refreshing, setRereshing] = useState(false);

   const onRefresh = async () => {
      setRereshing(true);
      await refetchPhotos();
      await refetchUsers();
      ToastAndroid.show("Se actualizo", ToastAndroid.SHORT);
      setRereshing(false);
   };

   return (
      <>
         {/* <SafeAreaView className={"h-full"}> */}
         {/* <HeaderComponent /> */}
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 bg-white p-4">
               {/* Imagen de Perfil */}
               <View className="items-center mt-2">
                  <Image
                     source={images.profile_manada}
                     // source={ { uri: "https://example.com/profile-picture.jpg" }}
                     className="w-36 h-36 rounded-full"
                  />
                  <IconPressableComponent
                     icon={
                        <Ionicons
                           name="camera"
                           size={20}
                           color={colors.primary[200]}
                        />
                     }
                     styleContent={`absolute bottom-0 left-[57%] bg-gray-200 p-2 rounded-full`}
                  />
               </View>

               {/* Nombre y Descripción */}
               <View className="mt-4 items-center">
                  <Text className=" text-2xl font-mbold text-gray-900">
                     {auth.name} {auth.paternal_last_name}{" "}
                     {auth.maternal_last_name}
                  </Text>
                  {/* <Text className="text-sm font-mregular text-gray-500">
                     22 años, dev del Campo
                  </Text> */}
                  <Text className="text-xs font-mregular text-gray-400">
                     Miembro desde -{" "}
                     {formatDatetime(
                        auth.created_at,
                        null,
                        "DD [de] MMM [de] YYYY",
                     )}
                  </Text>
               </View>

               {/* Información Personal */}
               <View className="mt-12">
                  <View className="flex-row items-center justify-between">
                     <Text className="text-lg font-msemibold text-gray-700">
                        Información Personal
                     </Text>
                     <TouchableOpacity>
                        <Text className="font-msemibold text-primary-200">
                           Editar
                        </Text>
                     </TouchableOpacity>
                  </View>

                  <View className="bg-gray-100/25 p-4 rounded-lg mt-4 space-y-8">
                     <View className="flex-row items-center">
                        <Ionicons
                           name="mail"
                           size={20}
                           color={colors.primary[200]}
                        />
                        <Text className="ml-2 font-mmedium text-gray-700">
                           {auth.email}
                        </Text>
                     </View>
                     <View className="flex-row items-center">
                        <Ionicons
                           name="phone-portrait"
                           size={20}
                           color={colors.primary[200]}
                        />
                        <Text className="ml-2 font-mmedium text-gray-700">
                           {formatPhone(auth.phone)}
                        </Text>
                     </View>
                     <View className="flex-row items-center">
                        <Ionicons
                           name="finger-print"
                           size={20}
                           color={colors.primary[200]}
                        />
                        <Text className="ml-2 font-mmedium text-gray-700">
                           {auth.curp}
                        </Text>
                     </View>
                  </View>
               </View>

               {/* Sección de Utilidades */}
               {/* <View className="mt-6">
                  <TouchableOpacity className="bg-gray-200 p-4 rounded-lg">
                     <Text className="text-lg font-mmedium text-gray-700">
                        Descargas
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-gray-200 p-4 rounded-lg mt-4">
                     <Text className="text-lg font-mmedium text-gray-700">
                        Ayuda
                     </Text>
                  </TouchableOpacity>
               </View> */}
            </View>
         </ScrollView>
         <FooterComponent />
         {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
         {/* </SafeAreaView> */}
      </>
   );
};

export default Profile;
