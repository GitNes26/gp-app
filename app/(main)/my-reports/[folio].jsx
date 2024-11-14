import { Image, Text, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import FooterComponent from "../../../components/FooterComponent";
import useAuthStore from "../../../stores/authStore";
import { FlatList } from "react-native-gesture-handler";
import useReportStore, { getMyReports } from "../../../stores/reportStore";
import { API_IMG } from "@env";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ReportDetails = () => {
   const { auth, isLoggedIn } = useAuthStore();
   const { report, reports } = useReportStore();

   const [refreshing, setRereshing] = useState(false);

   const onRefresh = async () => {
      setRereshing(true);
      await getMyReports();
      ToastAndroid.show("Se actualizo", ToastAndroid.SHORT);
      setRereshing(false);
   };

   const handleOnPress = (item) => {
      // SimpleToast(
      //    `Aqui se mostrará el detalle del folio #${item.folio}`,
      //    "center",
      // );
      // const item = affairs.find((item) => item.asunto_id === id);
      // setAffair(item);
      // router.push(`/report`);
   };

   useEffect(() => {
      getMyReports();
   }, []);

   if (!auth && !isLoggedIn) return <View></View>;

   return (
      <>
         <View className={"h-full"}>
            {/* <HeaderComponent /> */}
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" alwaysBounceVertical={true}>
               <View className="flex-1 bg-white p-3">
                  {/* TITULO */}
                  {/* <View className={"w-full justify-center items-center mt-5"}>
                  <Text className={"text-3xl font-mblack text-primary-200"}>
                     Mis <Text className={`text-black`}>Reportes</Text>
                  </Text>
               </View> */}

                  {/* AREA REPORTE */}
                  <View className="flex mb-3 p-2">
                     <Text className={`text-lg font-mblack text-center`}>REPORTE</Text>
                     <View className="flex p-2 bg-gray-100/50 rounded-xl">
                        <ItemContent title={"# FOLIO:"} value={report.id} />
                        <ItemContent title={"ASUNTO:"} value={report.asunto} />
                        <ItemContent title={"ESTATUS:"} value={report.estatus} />
                        <ItemContent title={"FECHA:"} value={report.fecha_reporte} />
                        <ItemContent title={"UBICACIÓN:"} value={report.localidad} />
                        <ItemContent title={"REFERENCIAS:"} value={report.referencias} horizontal={false} />
                        <ItemContent title={"OBSERVACIONES/REPORTE:"} value={report.observaciones} horizontal={false} />
                        <ItemContent title={"EVIDENCIA:"} img={report.img_reporte} horizontal={false} />
                     </View>
                  </View>

                  {/* AREA RESPUESTA */}
                  <View className="flex mb-3 p-2">
                     <Text className={`text-lg font-mblack text-center`}>RESPUESTA</Text>
                     <View className="flex p-2 bg-gray-100/50 rounded-xl">
                        <ItemContent title={"DEPARTAMENTO:"} value={report.department} />
                        <ItemContent title={"SERVICIO:"} value={report.servicio} />
                        <ItemContent title={"RESPUESTA:"} value={report.respuesta} horizontal={false} />
                        <ItemContent title={"EVIDENCIA 1:"} img={report.img_attach_1} horizontal={false} />
                        <ItemContent title={"EVIDENCIA 2:"} img={report.img_attach_2} horizontal={false} />
                        <ItemContent title={"EVIDENCIA 3:"} img={report.img_attach_3} horizontal={false} />
                        <ItemContent title={"EVIDENCIA 4:"} img={report.img_attach_4} horizontal={false} />
                        <ItemContent title={"EVIDENCIA 5:"} img={report.img_attach_5} horizontal={false} />
                     </View>
                  </View>
               </View>
            </KeyboardAwareScrollView>
            <FooterComponent />
            {/* <StatusBar backgroundColor={colors.primary.DEFAULT} style="inverted"  /> */}
         </View>
      </>
   );
};

export default ReportDetails;

const ItemContent = ({ title, value, img, horizontal = true }) => {
   return (
      <View className={`${horizontal ? "flex-row" : "flex"} items-center justify-between mb-1 p-3 bg-gray-100/50 rounded-lg`}>
         <Text className={`${horizontal ? "w-[40%]" : "mb-2"} font-mbold text-gray-500`}>{title}</Text>
         {value && (
            <Text className={`font-mblack text-gray-700 flex-wrap ${horizontal ? "w-[60%] text-right " : "w-full text-justify max-h-64 overflow-y-auto"}`}>
               {value}
            </Text>
         )}
         {img && <Image source={{ uri: `${API_IMG}/${img}` }} className={`w-[100%] aspect-square rounded-md`} resizeMode={"center"} />}
      </View>
   );
};
