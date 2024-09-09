import { Image, RefreshControl, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import FooterComponent from "../../../components/FooterComponent";
import images from "../../../constants/images";
import useAuthStore from "./../../../stores/authStore";
import { FlatList } from "react-native-gesture-handler";
import TouchableContentComponent from "../../../components/TouchableContentComponent";
import EmptyComponent from "../../../components/EmptyComponent";
import { SimpleToast } from "../../../utils/alerts";

const MyReports = () => {
   const { auth, isLoggedIn } = useAuthStore();

   const [refreshing, setRereshing] = useState(false);

   const myReports = [
      {
         id: 1,
         folio: 1,
         asunto: "Bacheo",
         status: "ALTA",
         comentarios:
            "Este es un mensaje de prueba SAJKLASDHJKLSAHDKHSALJHDASKDSAHL ASDJAS AL SKJDAS DKAS DLSA KLJSA JDLK ASSJDKKAS L",
         created_at: "2024-09-09",
      },
      {
         id: 2,
         folio: 2,
         asunto: "ALumbrado",
         status: "ALTA",
         comentarios:
            "Este es un mensaje de prueba SAJKLASDHJKLSAHDKHSALJHDASKDSAHL ASDJAS AL SKJDAS DKAS DLSA KLJSA JDLK ASSJDKKAS L",
         created_at: "2024-09-09",
      },
      {
         id: 3,
         folio: 3,
         asunto: "Bacheo",
         status: "PROCESO",
         comentarios:
            "Este es un mensaje de prueba SAJKLASDHJKLSAHDKHSALJHDASKDSAHL ASDJAS AL SKJDAS DKAS DLSA KLJSA JDLK ASSJDKKAS L",
         created_at: "2024-09-09",
      },
      {
         id: 4,
         folio: 4,
         asunto: "Vigilancia",
         status: "ALTA",
         comentarios:
            "Este es un mensaje de prueba SAJKLASDHJKLSAHDKHSALJHDASKDSAHL ASDJAS AL SKJDAS DKAS DLSA KLJSA JDLK ASSJDKKAS L",
         created_at: "2024-09-09",
      },
      {
         id: 5,
         folio: 5,
         asunto: "Basura",
         status: "ALTA",
         comentarios:
            "Este es un mensaje de prueba SAJKLASDHJKLSAHDKHSALJHDASKDSAHL ASDJAS AL SKJDAS DKAS DLSA KLJSA JDLK ASSJDKKAS L",
         created_at: "2024-09-09",
      },
      {
         id: 6,
         folio: 6,
         asunto: "Bacheo",
         status: "PROCESO",
         comentarios:
            "Este es un mensaje de prueba SAJKLASDHJKLSAHDKHSALJHDASKDSAHL ASDJAS AL SKJDAS DKAS DLSA KLJSA JDLK ASSJDKKAS L",
         created_at: "2024-09-09",
      },
   ];

   const onRefresh = async () => {
      setRereshing(true);
      // await refetchPhotos();
      // await refetchUsers();
      ToastAndroid.show("Se actualizo", ToastAndroid.SHORT);
      setRereshing(false);
   };

   const handleOnPress = (item) => {
      SimpleToast(
         `Aqui se mostrará el detalle del folio #${item.folio}`,
         "center",
      );
   };

   if (!auth && !isLoggedIn) return <View></View>;

   return (
      <>
         <View className={"h-full"}>
            {/* <HeaderComponent /> */}
            {/* <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            alwaysBounceVertical={true}> */}

            <View className="flex-1 bg-white p-3">
               {/* TITULO */}
               <View className={"w-full justify-center items-center mt-5"}>
                  <Text className={"text-3xl font-mblack text-primary-200"}>
                     Mis <Text className={`text-black`}>Reportes</Text>
                  </Text>
               </View>
               {/* Imagen de Perfil */}
               <View className="items-center mt-2">
                  <Image
                     source={images.profile_manada}
                     // source={ { uri: "https://example.com/profile-picture.jpg" }}
                     className="w-28 h-28 rounded-full"
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
                  <Text className="text-xs font-mregular text-gray-500">
                     a reportado {myReports.length} eventos
                  </Text>
               </View>

               {/* Lista */}
               <View className="flex-1 pt-5">
                  {/* Grid de Categorías */}
                  <FlatList
                     data={myReports}
                     keyExtractor={(item, index) => `${index}`}
                     numColumns={1}
                     renderItem={({ item }) => (
                        <ItemContent
                           key={`key-item-${item.id}`}
                           folio={item.folio}
                           asunto={item.asunto}
                           fecha={item.created_at}
                           status={item.status}
                           comentarios={item.comentarios}
                           // icon={}
                           onPress={() => handleOnPress(item)}
                        />
                     )}
                     ListEmptyComponent={() => (
                        <EmptyComponent
                           title={"No hay reportes"}
                           subtitle={"Recarga la sección..."}
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
            </View>
            {/* </KeyboardAwareScrollView> */}
            <FooterComponent />
            {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
         </View>
      </>
   );
};

export default MyReports;

const ItemContent = ({
   iconName,
   folio,
   asunto,
   status,
   comentarios,
   fecha,
   onPress,
}) => {
   return (
      <TouchableContentComponent
         styleContet="flex my-2 p-2 bg-gray-100/50 rounded-lg"
         onPress={onPress}>
         <View className="flex-row items-center justify-between mb-1">
            <Text className=" font-mbold text-gray-700">
               #{folio} - {asunto}
            </Text>
            <Text className=" font-mblack text-gray-700">{status}</Text>
         </View>
         <Text className="m-1 text-xs font-mregular text-gray-600">
            {comentarios.length > 10
               ? `${comentarios.slice(0, 75)}...`
               : comentarios}
         </Text>

         <View className={`flex items-end`}>
            <Text className="font-msemibold text-gray-700">{fecha}</Text>
         </View>
      </TouchableContentComponent>
   );
};
