import { Image, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FooterComponent from "../../../components/FooterComponent";
import { Ionicons } from "@expo/vector-icons";
import images from "../../../constants/images";
import colors from "../../../constants/colors";
import useAuthStore from "../../../stores/authStore";
import IconPressableComponent from "../../../components/IconPressableComponent";
import { formatDatetime, formatPhone } from "../../../utils/formats";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AvatarComponent from "../../../components/AvatarComponent";

const Profile = () => {
   const { auth, isLoggedIn } = useAuthStore();

   const [refreshing, setRereshing] = useState(false);

   const onRefresh = async () => {
      setRereshing(true);
      await refetchPhotos();
      await refetchUsers();
      ToastAndroid.show("Se actualizo", ToastAndroid.SHORT);
      setRereshing(false);
   };

   if (!auth && !isLoggedIn) return <View></View>;
   return (
      <>
         {/* <SafeAreaView className={"h-full"}> */}
         {/* <HeaderComponent /> */}
         <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" alwaysBounceVertical={true}>
            <View className="flex-1 bg-white p-4">
               {/* Imagen de Perfil */}
               <AvatarComponent
                  size="lg"
                  caption={
                     <View className="mt-4 items-center">
                        <Text className=" text-2xl font-mbold text-gray-900">
                           {auth.name} {auth.paternal_last_name} {auth.maternal_last_name}
                        </Text>
                        {/* <Text className="text-sm font-mregular text-gray-500">
                     22 años, dev del Campo
                  </Text> */}
                        <Text className="text-xs font-mregular text-gray-500">Miembro desde - {formatDatetime(auth.created_at, null, "DD [de] MMM [de] YYYY")}</Text>
                     </View>
                  }
               />
               {/* <View className="items-center mt-2">
                  <Image
                     source={images.profile_manada}
                     // source={ { uri: "https://example.com/profile-picture.jpg" }}
                     className="w-36 h-36 rounded-full"
                  />
                  <IconPressableComponent
                     icon={<Ionicons name="camera" size={20} color={colors.primary[200]} />}
                     styleContent={`absolute bottom-0 left-[57%] bg-gray-200 p-2 rounded-full`}
                  />
               </View> */}

               {/* Información Personal */}
               <View className="mt-12">
                  <View className="flex-row items-center justify-between">
                     <Text className="text-lg font-msemibold text-gray-700">Información Personal</Text>
                     <TouchableOpacity>
                        <Text className="font-msemibold text-primary-200">Editar</Text>
                     </TouchableOpacity>
                  </View>

                  <View className="bg-gray-100/25 p-4 rounded-lg mt-4 space-y-8">
                     <ItemContent iconName={"mail"} title={"Correo"} value={auth.email} />
                     <ItemContent iconName={"phone-portrait"} title={"Teléfono"} value={formatPhone(auth.phone)} />
                     <ItemContent iconName={"finger-print"} title={"CURP"} value={auth.curp} />
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
         </KeyboardAwareScrollView>
         <FooterComponent />
         {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
         {/* </SafeAreaView> */}
      </>
   );
};

export default Profile;

const ItemContent = ({ iconName, title, value }) => {
   return (
      <View className="flex-row items-center justify-between my-4">
         <View className="flex-row items-center">
            <Ionicons name={iconName} size={20} color={colors.primary[200]} />
            <Text className="ml-2 font-mmedium text-gray-400">{title}:</Text>
         </View>
         <Text className="ml-2 font-mmedium text-gray-700">{value}</Text>
      </View>
   );
};
