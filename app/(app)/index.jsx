import {
   FlatList,
   Image,
   Text,
   ToastAndroid,
   TouchableOpacity,
   View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import useFetch from "../../hooks/useFetch";
import { getAllPhotos } from "../../contexts/GlobalContext";
import { router, useNavigation } from "expo-router";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";

const Index = () => {
   const navigation = useNavigation();

   const {
      data: photos,
      isLoading,
      refetch: refetchPhotos,
   } = useFetch(getAllPhotos);
   // console.log("🚀 ~ Index ~ photos:", photos);
   const { data: users, refetch: refetchUsers } = useFetch(getAllPhotos);
   const dataBtns = [
      { id: 1, icon: images.btnAlumbrado, title: "Alumbrado Público" },
      { id: 2, icon: images.btnBacheo, title: "Bacheo" },
      { id: 3, icon: images.btnBasura, title: "Basura" },
      { id: 4, icon: images.btnEcologia, title: "Ecología" },
   ];
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
               Nuevo <Text className={`text-black`}>Reporte</Text>
            </Text>
            <Text className={"text-2xl font-mmedium text-gray-500"}>Áreas</Text>
         </View>
         {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
         <View className="flex-1 pt-5">
            {/* Grid de Categorías */}
            <FlatList
               data={dataBtns}
               keyExtractor={(item) => item.$id}
               numColumns={3}
               renderItem={({ item }) => (
                  <CategoryItem
                     key={`key-${item.id}`}
                     icon={item.icon}
                     title={item.title}
                     onPress={() => console.log("click")}
                  />
               )}
            />
         </View>
         {/* </ScrollView> */}
         <FooterComponent />
         {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
      </SafeAreaView>
   );
};

export default Index;

const CategoryItem = ({ title, icon, onPress }) => (
   <View className={`flex-1 items-stretch`}>
      <TouchableOpacity
         className=" flex items-center justify-start m-2"
         onPress={() => router.push(`/${title}`)}>
         <Image source={icon} className={"w-24 h-24 mb-1"} resizeMode="cover" />
         <Text className={"text-base font-mregular text-center text-gray-500"}>
            {title}
         </Text>
      </TouchableOpacity>
   </View>
);
