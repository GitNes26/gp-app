import { Image, RefreshControl, Text, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import FooterComponent from "../../../components/FooterComponent";
import images from "../../../constants/images";
import useAuthStore from "./../../../stores/authStore";
import { FlatList } from "react-native-gesture-handler";
import TouchableContentComponent from "../../../components/TouchableContentComponent";
import EmptyComponent from "../../../components/EmptyComponent";
import { SimpleToast } from "../../../utils/alerts";
import useReportStore, { getMyReports } from "../../../stores/reportStore";
import { Link, router } from "expo-router";

const MyReports = () => {
   const { auth, isLoggedIn } = useAuthStore();
   const { report, setReport, reports } = useReportStore();

   const [refreshing, setRereshing] = useState(false);

   const onRefresh = async () => {
      setRereshing(true);
      await getMyReports();
      SimpleToast("Se actualizo", "bottom");
      setRereshing(false);
   };

   const handleOnPress = (id) => {
      const item = reports.find((item) => item.id === id);
      setReport(item);
      router.push(`/my-reports/details`);
      // router.push(`/my-reports/details/${id}`);
   };

   useEffect(() => {
      getMyReports();
   }, []);

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
               {/* Lista */}
               <FlatList
                  data={reports}
                  keyExtractor={(item, index) => `${index}`}
                  numColumns={1}
                  ListHeaderComponent={() => (
                     <>
                        {/* TITULO */}
                        <View className={"w-full justify-center items-center mt-3"}>
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
                        <View className="mt-4 items-center mb-5">
                           <Text className=" text-2xl font-mbold text-gray-900">
                              {auth.name} {auth.paternal_last_name} {auth.maternal_last_name}
                           </Text>
                           {/* <Text className="text-sm font-mregular text-gray-500">
                     22 años, dev del Campo
                  </Text> */}
                           <Text className="text-sm font-mregular text-gray-500">a reportado {reports.length} eventos</Text>
                        </View>
                     </>
                  )}
                  renderItem={({ item }) => (
                     <ItemContent
                        key={`key-item-${item.id}`}
                        id={item.id}
                        asunto={item.asunto}
                        fecha_reporte={item.fecha_reporte}
                        estatus={item.estatus}
                        observaciones={item.observaciones}
                        // icon={}
                        onPress={() => handleOnPress(item.id)}
                     />
                  )}
                  ListEmptyComponent={() => <EmptyComponent title={"No hay reportes"} subtitle={"Recarga la sección..."} />}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
               />
            </View>
            {/* </KeyboardAwareScrollView> */}
            <FooterComponent />
            {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
         </View>
      </>
   );
};

export default MyReports;

const ItemContent = ({ id, asunto, estatus, observaciones, fecha_reporte, onPress }) => {
   // EVIDENCIAS: ALTA = AZUL , EN TRAMITE = AMARILLO , TERMINADO = VERDE
   const bgColor =
      estatus === "ALTA" ? "bg-blue-600/50" : estatus === "EN TRAMITE" ? "bg-yellow-600/50" : estatus === "TERMINADO" ? "bg-green-600/50" : "bg-gray-100/50";
   return (
      <View className={`flex-1 items-stretch my-2`}>
         <TouchableContentComponent styleContet={`flex p-2 ${bgColor} rounded-lg`} onPress={onPress}>
            <View className="flex-row items-center justify-between mb-1">
               <Text className=" font-mbold text-gray-700">
                  #{id} - {asunto}
               </Text>
               <Text className=" font-mblack text-gray-700">{estatus}</Text>
            </View>
            <Text className="m-1 text-xs font-mregular text-gray-600">{observaciones.length > 10 ? `${observaciones.slice(0, 45)}...` : observaciones}</Text>

            <View className={`flex items-end`}>
               <Text className="font-msemibold text-gray-700">{fecha_reporte}</Text>
            </View>
         </TouchableContentComponent>
      </View>
   );
};
