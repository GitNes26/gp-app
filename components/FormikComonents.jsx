// Formik x React Native example
import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
   ActivityIndicator,
   Button,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import { Form, Formik, useFormikContext } from "formik";
import ButtonCompnent from "./ButtonCompnent";
import { Ionicons } from "@expo/vector-icons";
import { handleInputFormik } from "../utils/formats";
import colors from "../constants/colors";

//#region FORMIK COMPONENT
export const FormikComponent = ({
   formik,
   children,
   textBtnSubmit = "ENVIAR",
}) => {
   const {
      handleChange,
      handleBlur,
      values,
      validationSchema,
      errors,
      touched,
      handleSubmit,
      isSubmitting,
      setSubmitting,
      initialValues,
   } = formik;

   useEffect(() => {
      setSubmitting(false);
   }, []);

   return (
      <Formik
         initialValues={initialValues}
         onSubmit={handleSubmit}
         validationSchema={validationSchema}>
         {({ handleSubmit, setSubmitting, resetForm, errors }) => (
            <View className={`my-2`}>
               {children}
               <ButtonCompnent
                  title={textBtnSubmit}
                  handleOnPress={handleSubmit}
                  containerStyles={"mt-7"}
                  isLoading={isSubmitting}
               />
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
   loading,
   isPassword = false,
   rows = null,
   readOnly,
   textStyleCase = null,
   otherStyles,
   keyboardType,
   formik,
   ...props
}) => {
   const [showPassword, setShowPassword] = useState(isPassword);
   // const formik = useFormikContext();
   const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
      formik;
   const error = touched[idName] && errors[idName] ? errors[idName] : null;
   const isError = error == null ? false : true;
   const inputRef = useRef(null);

   useEffect(() => {
      // console.log("isError", isError);
   }, [idName, values[idName]]);

   return (
      <View className={`mt-2 mb-3 ${otherStyles}`}>
         <Text
            className={`text-base ${isError ? "text-red-600" : "text-primary"} font-msemibold`}>
            {label}
         </Text>
         <View
            className={`border-2 border-slate-200 w-full h-16 px-4 bg-slate-50 rounded-2xl focus:border-primary-200 items-center flex-row ${isError && "border-red-600"} ${readOnly && "bg-slate-500"}`}>
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
               // textContentType="URL"
               multiline={rows > 0 ? true : false}
               numberOfLines={rows}
               readOnly={readOnly}
            />
            {isPassword && (
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {!showPassword ? (
                     <Ionicons name="eye-sharp" size={24} color={"black"} />
                  ) : (
                     <Ionicons name="eye-off-sharp" size={24} color={"black"} />
                  )}
               </TouchableOpacity>
            )}
            {loading && (
               <ActivityIndicator
                  size={"large"}
                  color={colors.primary[200]}
                  className={`ml-1`}
                  // className={`absolute -top-[50%] left-[40%]`}
               />
            )}
         </View>
         <Text
            className={`text-sm italic px-2 ${isError ? "text-red-600" : "text-gray-400"} font-mlight`}>
            {isError ? error : helperText}
         </Text>
      </View>
   );
};
//#endregion INPUT COMPONENT
