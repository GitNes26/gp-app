// Formik x React Native example
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Form, Formik, useFormikContext } from "formik";
import ButtonCompnent from "./ButtonCompnent";
import { Ionicons } from "@expo/vector-icons";
import { handleInputFormik } from "../utils/formats";
import colors from "../constants/colors";
import { styled } from "nativewind";

//#region FORMIK COMPONENT
export const FormikComponent = ({ formik, children, textBtnSubmit = "ENVIAR", containerStyles }) => {
   const { handleChange, handleBlur, values, validationSchema, errors, touched, handleSubmit, isSubmitting, setSubmitting, initialValues } = formik;

   useEffect(() => {
      setSubmitting(false);
   }, []);

   return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
         {({ handleSubmit, setSubmitting, resetForm, errors }) => (
            <View className={`my-2 mt-5 ${containerStyles}`}>
               {children}
               <ButtonCompnent title={textBtnSubmit} handleOnPress={handleSubmit} containerStyles={"mt-7"} isLoading={isSubmitting} />
            </View>
         )}
      </Formik>
   );
};
//#endregion FORMIK COMPONENT

//#region INPUT COMPONENT
// import {
//    Image,
//    StyleSheet,
//    Text,
//    TextInput,
//    TouchableOpacity,
//    View,
// } from "react-native";
// import React, { useState } from "react";
// import colors from "../constants/colors";
// import icons from "../constants/icons";
// import { Ionicons } from "@expo/vector-icons";

export const InputComponent = ({
   idName,
   label,
   placeholder,
   // handlChangeText,
   helperText,
   isLoading,
   isPassword = false,
   rows = null,
   readOnly,
   textStyleCase = null,
   otherStyles,
   keyboardType,
   maxLength,
   formik,
   ...props
}) => {
   const [showPassword, setShowPassword] = useState(isPassword);
   // const formik = useFormikContext();
   const { values, touched, errors, handleChange, handleBlur, setFieldValue } = formik;
   const error = touched[idName] && errors[idName] ? errors[idName] : null;
   const isError = error == null ? false : true;
   const inputRef = useRef(null);

   // useEffect(() => {
   //    // console.log("isError", isError);
   // }, [idName, values[idName]]);

   return (
      <View className={`mb-5 ${otherStyles}`}>
         <Text className={`text-base pl-3 ${isError ? "text-red-600" : "text-primary"} font-msemibold`}>{label}</Text>
         <View
            className={`border-2 border-slate-200 w-full ${!rows ? "max-h-[75vh]" : "h-16"} px-4 bg-slate-50 rounded-2xl focus:border-primary-200 items-center flex-row ${isError && "border-red-600"} ${readOnly && "bg-slate-200"}`}
         >
            <TextInput
               key={`key-${idName}`}
               id={idName}
               className={"flex-1 text-black-100 font-msemibold text-base"}
               value={values && values[idName] ? values[idName] : ""}
               placeholder={placeholder}
               placeholderTextColor={colors.gray[100]}
               onChangeText={handleChange(idName)}
               onBlur={handleBlur(idName)}
               // onTextInput={(e) => {
               //    textStyleCase != null
               //       ? handleInputFormik(
               //            e,
               //            setFieldValue,
               //            idName,
               //            textStyleCase,
               //         )
               //       : null;
               // }}
               secureTextEntry={showPassword}
               keyboardType={keyboardType}
               maxLength={maxLength}
               // textContentType="URL"
               multiline={rows > 0 ? true : false}
               numberOfLines={rows}
               readOnly={readOnly}
            />
            {isPassword && (
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {!showPassword ? <Ionicons name="eye-sharp" size={24} color={"black"} /> : <Ionicons name="eye-off-sharp" size={24} color={"black"} />}
               </TouchableOpacity>
            )}
            {isLoading && (
               <ActivityIndicator
                  size={"large"}
                  color={colors.primary[200]}
                  className={`ml-1`}
                  // className={`absolute -top-[50%] left-[40%]`}
               />
            )}
         </View>
         <Text className={`text-sm italic px-2 ${isError ? "text-red-600" : "text-gray-400"} font-mlight`}>{isError ? error : helperText}</Text>
      </View>
   );
};
//#endregion INPUT COMPONENT

//#region RADIO BUTTONS COMPONENT
// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { styled } from 'nativewind';
// import React, { useState } from 'react';
// import { View } from 'react-native';
// import RadioButton from './RadioButton';
// import React from 'react';
// import { View, Text } from 'react-native';
// import RadioGroup from './RadioGroup';

const RadioButton = ({ label, value, selected, onPress, horizontal, readOnly }) => {
   return (
      <TouchableOpacity onPress={() => onPress(value)} className={`flex-row items-center my-2 ${horizontal && "mx-3"}`} disabled={readOnly}>
         <View className={`w-6 h-6 rounded-full border-2 border-gray-400 ${selected ? "border-primary-200" : ""} justify-center items-center`}>
            {selected && <View className={`w-3 h-3 rounded-full bg-primary-200`} />}
         </View>
         <Text className={`ml-2 font-mregular text-gray-800 ${selected && "font-msemibold"} `}>{label}</Text>
      </TouchableOpacity>
   );
};
export default styled(RadioButton);

const RadioGroup = ({ options, onValueChange, horizontal, readOnly }) => {
   const [selectedValue, setSelectedValue] = useState(null);

   const handlePress = (value) => {
      setSelectedValue(value);
      onValueChange(value);
   };

   return (
      <View className={`${horizontal && "flex-row"} `}>
         {options.map((option) => (
            <RadioButton
               key={option.value}
               label={option.label}
               value={option.value}
               selected={selectedValue === option.value}
               onPress={handlePress}
               horizontal={horizontal}
               readOnly={readOnly}
            />
         ))}
      </View>
   );
};

// const options = [
//    { label: "Opción 1", value: "option1" },
// ];
export const RadioButtonComponent = ({ idName, label, options, placeholder, helperText, isLoading, readOnly, otherStyles, horizontal = true, formik, ...props }) => {
   // const formik = useFormikContext();
   // console.log("🚀 ~ formik:", formik);
   const { values, touched, errors, handleChange, handleBlur, setFieldValue } = formik;
   const error = touched[idName] && errors[idName] ? errors[idName] : null;
   const isError = error == null ? false : true;
   const inputRef = useRef(null);

   const handleValueChange = (value) => {
      console.log("Selected:", value);
      formik.setFieldValue(idName, value);
   };

   useEffect(() => {
      // console.log("isError", isError);
   }, [idName, values[idName]]);

   return (
      <View className="mb-3 flex-1 justify-center">
         <Text className={`text-base pl-3 ${isError ? "text-red-600" : "text-primary"} font-msemibold`}>{label}</Text>
         <View
            className={`border-2 border-slate-200 w-full h-auto p-3 bg-slate-50 rounded-2xl focus:border-primary-200 justify-center items-center  ${isError && "border-red-600"} ${readOnly && "bg-slate-200"}`}
         >
            <RadioGroup options={options} onValueChange={handleValueChange} horizontal={horizontal} readOnly={readOnly} />
            {isLoading && (
               <ActivityIndicator
                  size={"large"}
                  color={colors.primary[200]}
                  // className={`ml-1`}
                  className={`absolute top-[35%] right-[1%]`}
               />
            )}
         </View>
         <Text className={`text-sm italic px-2 ${isError ? "text-red-600" : "text-gray-400"} font-mlight`}>{isError ? error : helperText}</Text>
      </View>
   );
};

//#endregion RADIO BUTTONS COMPONENT
