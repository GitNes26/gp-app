import {
   FlatList,
   Image,
   RefreshControl,
   ScrollView,
   Text,
   ToastAndroid,
   TouchableOpacity,
   View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchComponent from "../../components/SearchComponent";
import CarruselComponent from "../../components/CarruselComponent";
import EmptyComponent from "../../components/EmptyComponent";
import PreviewCardComponent from "../../components/PreviewCardComponent";
import useFetch from "../../hooks/useFetch";
import { getAllPhotos, getAllPosts } from "../../contexts/GlobalContext";
import InputComponent from "../../components/InputComponent";
import { Link } from "expo-router";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";

const Report = () => {
   const {
      data: photos,
      isLoading,
      refetch: refetchPhotos,
   } = useFetch(getAllPhotos);
   // console.log("🚀 ~ Report ~ photos:", photos);
   const { data: users, refetch: refetchUsers } = useFetch(getAllPhotos);
   const dataBtns = [
      { id: 1, icon: images.btnAlumbrado, title: "Alumbrado Público" },
      { id: 2, icon: images.btnBacheo, title: "Bacheo" },
      { id: 3, icon: images.btnBasura, title: "Basura" },
      { id: 4, icon: images.btnEcologia, title: "Ecología" },
      { id: 5, icon: images.btnAlumbrado, title: "Alumbrado Público" },
      { id: 6, icon: images.btnBacheo, title: "Bacheo" },
      { id: 7, icon: images.btnBasura, title: "Basura" },
      { id: 8, icon: images.btnEcologia, title: "Ecología" },
      { id: 9, icon: images.btnAlumbrado, title: "Alumbrado Público" },
      { id: 10, icon: images.btnBacheo, title: "Bacheo" },
      { id: 11, icon: images.btnBasura, title: "Basura" },
      { id: 12, icon: images.btnEcologia, title: "Ecología" },
      { id: 13, icon: images.btnAlumbrado, title: "Alumbrado Público" },
      { id: 14, icon: images.btnBacheo, title: "Bacheo" },
      { id: 15, icon: images.btnBasura, title: "Basura" },
      { id: 16, icon: images.btnEcologia, title: "Ecología" },
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
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 py-5">
               {/* Grid de Categorías */}
               <ScrollView>
                  <FlatList
                     data={dataBtns}
                     keyExtractor={(item) => item.$id}
                     numColumns={3}
                     renderItem={({ item }) => (
                        <CategoryItem icon={item.icon} title={item.title} />
                     )}
                  />
                  {/* <View className="grid grid-cols-5 gap-1 flex-row flex-wrap">
                     <CategoryItem
                        title="Alumbrado Público"
                        icon="lightbulb-o"
                     />
                     <CategoryItem title="Ecología" icon="tree" />
                     <CategoryItem title="Otros" icon="ellipsis-h" />
                  </View> */}
               </ScrollView>
            </View>
         </ScrollView>
         <FooterComponent />
         {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
      </SafeAreaView>
   );
};

export default Report;

const CategoryItem = ({ title, icon }) => (
   <View className={`flex-1 items-stretch`}>
      <TouchableOpacity className=" flex items-center justify-start m-2">
         <Image source={icon} className={"w-24 h-24 mb-1"} resizeMode="cover" />
         <Text className={"text-base font-mregular text-center text-gray-500"}>
            {title}
         </Text>
      </TouchableOpacity>
   </View>
);

/*
<View className={"px-2 flex-1 justify-start"}>
               <View className={"w-full justify-center items-center"}>
                  <Text
                     className={"text-3xl font-mblack mt-10 text-primary-200"}>
                     Nuevo <Text className={`text-black`}>Reporte</Text>
                  </Text>
                  <Text className={"text-2xl font-mmedium text-gray-500"}>
                     Áreas
                  </Text>
               </View>
               <View className={"flex-row gap-8 flex-wrap mt-10"}>
                  <View className={`flex justify-center items-center w-1/4 `}>
                     <Image
                        source={images.btnBacheo}
                        className={"w-24 h-24 mb-1"}
                        resizeMode="contain"
                     />
                     <Text
                        className={
                           "text-base font-mregular text-center text-gray-500"
                        }>
                        Alumbrado Público requetepublicote
                     </Text>
                  </View>
                  <View className={`flex justify-center items-center w-1/4 `}>
                     <Image
                        source={images.btnBacheo}
                        className={"w-24 h-24 mb-1"}
                        resizeMode="contain"
                     />
                     <Text
                        className={
                           "text-base font-mregular text-center text-gray-500"
                        }>
                        Alumbrado Público requetepublicote
                     </Text>
                  </View>
                  <View className={`flex justify-center items-center w-1/4 `}>
                     <Image
                        source={images.btnBacheo}
                        className={"w-24 h-24 mb-1"}
                        resizeMode="contain"
                     />
                     <Text
                        className={
                           "text-base font-mregular text-center text-gray-500"
                        }>
                        Alumbrado Público requetepublicote
                     </Text>
                  </View>
                  <View className={`flex justify-center items-center w-1/4 `}>
                     <Image
                        source={images.btnBacheo}
                        className={"w-24 h-24 mb-1"}
                        resizeMode="contain"
                     />
                     <Text
                        className={
                           "text-base font-mregular text-center text-gray-500"
                        }>
                        Alumbrado Público requetepublicote
                     </Text>
                  </View>
               </View>
            </View>*/
