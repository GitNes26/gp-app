import React, { useState } from "react";
import { View, ActivityIndicator, Text, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import useGlobalStore from "../stores/globalStore";

const LoadingComponent = ({ text = "CARGANDO" }) => {
   // const [visible, setVisible] = useState(true);
   const isLoading = useGlobalStore((state) => state.isLoading);
   const setIsLoading = useGlobalStore((state) => state.setIsLoading);

   return (
      <SafeAreaView className={"h-full"}>
         <Modal
            transparent={true}
            animationType="fade"
            visible={isLoading}
            onRequestClose={() => setIsLoading(false)}>
            <View
               className={`absolute inset-0 w-full h-full bg-black-100/50 justify-center items-center`}>
               <Text className={`font-mbold text-2xl text-white mb-5`}>
                  {text}
               </Text>
               <ActivityIndicator
                  size={"large"}
                  animating={true}
                  color={"white"}
               />
            </View>
         </Modal>
      </SafeAreaView>
   );
};

export default LoadingComponent;
