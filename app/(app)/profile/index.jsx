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

const Profile = () => {
   const {
      data: photos,
      isLoading,
      refetch: refetchPhotos,
   } = useFetch(getAllPhotos);
   // console.log("🚀 ~ Profile ~ photos:", photos);
   const { data: users, refetch: refetchUsers } = useFetch(getAllPhotos);

   const [refreshing, setRereshing] = useState(false);

   const onRefresh = async () => {
      setRereshing(true);
      await refetchPhotos();
      await refetchUsers();
      ToastAndroid.show("Se actualizo", ToastAndroid.SHORT);
      setRereshing(false);
   };

   return (
      <SafeAreaView className={"h-full "}>
         <HeaderComponent />
         {/* Título */}
         <View className={"w-full justify-center items-center mb-5"}>
            <Text className={"text-3xl font-mblack mt-10 text-primary-200"}>
               Nuevo <Text className={`text-black`}>Profile</Text>
            </Text>
            <Text className={"text-2xl font-mmedium text-gray-500"}>Áreas</Text>
         </View>
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 py-5">
               {/* Grid de Categorías */}
               <ScrollView>
                  <Text>PERFIL</Text>
               </ScrollView>
            </View>
         </ScrollView>
         <FooterComponent />
         {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
      </SafeAreaView>
   );
};

export default Profile;
