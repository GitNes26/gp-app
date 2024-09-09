import React from "react";
import { Modal, View, Text } from "react-native";

const ModalComponent = ({
   children,
   title,
   footer,
   visible,
   size,
   animationType = "fade",
}) => {
   // const [visible, setVisible] = useState(true);

   return (
      <Modal
         transparent={true}
         animationType={animationType}
         visible={visible}
         onRequestClose={false}>
         <View
            className={`absolute inset-0 w-full h-full bg-black-100/50 justify-center items-center p-5`}>
            <View
               className={`flex bg-white rounded-xl p-4 ${size === "sm" ? "w-[50%]" : size === "md" ? "w-[75%]" : size === "lg" ? "w-full" : "w-auto"}`}>
               <Text className={`text-lg font-mbold mb-5 text-center`}>
                  {title}
               </Text>
               <View className={`text-base font-mregular`}>{children}</View>
               <View className={`text-lg font-mbold`}>{footer}</View>
            </View>
         </View>
      </Modal>
   );
};

export default ModalComponent;
