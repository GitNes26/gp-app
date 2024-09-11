import { FlatList, Image, RefreshControl, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../images";
import SearchComponent from "../../SearchComponent";
import CarruselComponent from "../../CarruselComponent";
import EmptyComponent from "../../EmptyComponent";
import PreviewCardComponent from "../../PreviewCardComponent";
import useFetch from "../../../hooks/useFetch";
import { getAllPhotos, getAllPosts } from "../../../contexts/GlobalContext";

const Home = () => {
   const { data: photos, isLoading, refetch: refetchPhotos } = useFetch(getAllPhotos);
   // console.log("🚀 ~ Home ~ photos:", photos);
   const { data: users, refetch: refetchUsers } = useFetch(getAllPhotos);
   // const videos = [
   //    { id: "cards.png", image: "cards" },
   //    { id: "profile.png", image: "profile" },
   //    { id: "thumbnail.png", image: "thumbnail" },
   // ];
   const [refreshing, setRereshing] = useState(false);

   const onRefresh = async () => {
      setRereshing(true);
      await refetchPhotos();
      await refetchUsers();
      ToastAndroid.show("Se actualizo", ToastAndroid.SHORT);
      setRereshing(false);
   };

   return (
      <SafeAreaView className={"bg-primary h-full"}>
         <FlatList
            data={photos}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <PreviewCardComponent video={item} />}
            ListHeaderComponent={() => (
               <View className={"my-6 px-4 space-y-6"}>
                  <View className={"justify-between items-start flex-row"}>
                     <View>
                        <Text className={"font-medium text-sm text-gray-100"}>Bienvenido ;)</Text>
                        <Text className={"text-2xl font-semibold text-white"}>Nestorín</Text>
                     </View>
                     <View className={"mt-1.5"}>
                        <Image source={images.logoSmall} className={"w-9 h-10"} resizeMode="contain" />
                     </View>
                  </View>

                  <SearchComponent placeholder={"Buscar contenido"} />

                  <View className={"w-full flex-1 pt-5 pb-8"}>
                     <Text className={"text-gray-100 text-lg font-regular mb-3"}>Ultimas Predicas</Text>
                     <CarruselComponent
                        data={photos}
                        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                     />
                  </View>
               </View>
            )}
            ListEmptyComponent={() => <EmptyComponent title={"No hay videos"} subtitle={"Carga tu primer video"} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
         />
      </SafeAreaView>
   );
};

export default Home;
