import {
   Image,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import icons from "../constants/icons";

const InputComponent = ({
   title,
   value,
   placeholder,
   handlChangeText,
   otherStyles,
   keyboardType,
   isPassword = false,
   ...props
}) => {
   const [showPassword, setShowPassword] = useState(isPassword);

   return (
      <View className={`space-y-2 ${otherStyles}`}>
         <Text className={`text-base text-gray-100 font-pmedium`}>{title}</Text>
         <View
            className={`border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row`}>
            <TextInput
               className={"flex-1 text-white font-psemibold text-base"}
               value={value}
               placeholder={placeholder}
               placeholderTextColor={colors.gray.DEFAULT}
               onChangeText={handlChangeText}
               secureTextEntry={showPassword}
               keyboardType={keyboardType}
            />
            {isPassword && (
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Image
                     source={!showPassword ? icons.eye : icons.eyeHide}
                     className={`w-7 h-7`}
                     resizeMode="contain"
                  />
               </TouchableOpacity>
            )}
         </View>
      </View>
   );
};

export default InputComponent;

const styles = StyleSheet.create({});
