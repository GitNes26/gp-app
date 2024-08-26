import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconPressableComponent from "./IconPressableComponent";

const PhotoPreviewComponent = ({
   photo,
   handleRetakePhoto,
   handleApprovedPhoto,
}) => {
   console.log("🚀 ~ photo:", photo);

   return (
      <SafeAreaView
         className={"h-full flex-1 justify-center items-center bg-black-100"}>
         <View
            className={`rounded-3xl p-1 w-full h-[90%] bg-black-200 justify-center items-center`}>
            <Image
               className={`w-[85%] h-[85%] rounded-3xl`}
               source={{ uri: "data:image/jpg;base64," + photo.base64 }}
            />
         </View>

         <View className={`mt-2 flex-row w-full justify-evenly items-center `}>
            <IconPressableComponent
               icon={<Ionicons name="trash" size={50} color={"white"} />}
               backdrop={true}
               handleOnPress={handleRetakePhoto}
            />
            <IconPressableComponent
               icon={
                  <Ionicons
                     name="checkmark-circle-sharp"
                     size={50}
                     color={"white"}
                  />
               }
               backdrop={true}
               handleOnPress={handleApprovedPhoto}
            />
         </View>
      </SafeAreaView>
   );
};

export default PhotoPreviewComponent;
