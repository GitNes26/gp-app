import {
   FlatList,
   Image,
   RefreshControl,
   Text,
   ToastAndroid,
   TouchableOpacity,
   View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import useFetch from "../../hooks/useFetch";
import { getAllPhotos } from "../../contexts/GlobalContext";
import { router, useNavigation } from "expo-router";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import useAffairStore, { getAllAffairs } from "../../stores/affairStore";
import { API_IMG } from "@env";
import EmptyComponent from "../../components/EmptyComponent";

const Index = () => {
   const navigation = useNavigation();
   const { affairs, setAffair } = useAffairStore();

   // const {
   //    data: affairst,
   //    isLoading,
   //    refetch: refetchAffairs,
   // } = useFetch(getAllAffairs);

   // console.log("🚀 ~ Index ~ affairs:", affairs);
   const [refreshing, setRereshing] = useState(false);
   const onRefresh = async () => {
      setRereshing(true);
      // await refetchAffairs();
      await getAllAffairs();
      ToastAndroid.show("Se actualizo", ToastAndroid.SHORT);
      setRereshing(false);
   };

   const handlePressCategory = (id) => {
      const item = affairs.find((item) => item.id === id);
      setAffair(item);
      router.push(`/${id}`);
   };

   useEffect(() => {
      getAllAffairs();
   }, []);

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
               data={affairs}
               keyExtractor={(item, index) => `${item.id}-${index}`}
               numColumns={3}
               renderItem={({ item }) => (
                  <CategoryItem
                     key={`key-${item.id}-${item.asunto}`}
                     // icon={}
                     uriIcon={item.icono.split("gomezapp/")[1]}
                     title={item.asunto}
                     onPress={() => handlePressCategory(item.id)}
                  />
               )}
               ListEmptyComponent={() => (
                  <EmptyComponent
                     title={"No hay asuntos"}
                     subtitle={"Carga tu primer video"}
                  />
               )}
               refreshControl={
                  <RefreshControl
                     refreshing={refreshing}
                     onRefresh={onRefresh}
                  />
               }
            />
         </View>
         {/* </ScrollView> */}
         <FooterComponent />
         {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
      </SafeAreaView>
   );
};

export default Index;

const CategoryItem = ({ title, icon, uriIcon, onPress }) => {
   return (
      <View className={`flex-1 items-stretch mb-10`}>
         <TouchableOpacity
            className=" flex items-center justify-start m-2"
            onPress={onPress}>
            <Image
               source={icon ? icon : { uri: `${API_IMG}/${uriIcon}` }}
               className={"w-24 h-24 mb-1"}
               resizeMode="cover"
            />
            <Text
               className={"text-base font-mregular text-center text-gray-500"}>
               {title}
            </Text>
         </TouchableOpacity>
      </View>
   );
};
