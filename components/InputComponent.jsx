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
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const InputComponent = ({
   title,
   value,
   placeholder,
   handlChangeText,
   otherStyles,
   keyboardType,
   isPassword = false,
   rows = null,
   readOnly,
   ...props
}) => {
   const [showPassword, setShowPassword] = useState(isPassword);

   return (
      <View className={` ${otherStyles}`}>
         <Text className={`text-base text-primary font-msemibold`}>
            {title}
         </Text>
         <View
            className={`border-2 border-slate-200 w-full h-16 px-4 bg-slate-50 rounded-2xl focus:border-primary-200 items-center flex-row`}>
            <TextInput
               className={"flex-1 text-black-100 font-msemibold text-base"}
               value={value}
               placeholder={placeholder}
               placeholderTextColor={colors.gray[100]}
               onChangeText={handlChangeText}
               secureTextEntry={showPassword}
               keyboardType={keyboardType}
               // textContentType="URL"
               multiline={rows > 0 ? true : false}
               numberOfLines={rows}
               readOnly={readOnly}
            />
            {isPassword && (
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {!showPassword ? (
                     <FontAwesome6 name="eye" size={18} color={"black"} />
                  ) : (
                     <FontAwesome6 name="eye-slash" size={18} color={"black"} />
                  )}
               </TouchableOpacity>
            )}
         </View>
      </View>
   );
};

export default InputComponent;
