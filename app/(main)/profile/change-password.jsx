import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FormikComponent, InputComponent } from "../../../components/FormikComponents";
import FooterComponent from "../../../components/FooterComponent";
import * as Yup from "yup";
import useAuthStore, { updatePassword } from "../../../stores/authStore";
import { SimpleToast } from "../../../utils/alerts";
import { useFormik } from "formik";
import useGlobalStore from "../../../stores/globalStore";

const ChangePassword = () => {
   const { setIsLoading } = useGlobalStore();
   const { auth } = useAuthStore();

   const initialValues = {
      id: auth.id,
      oldPassword: "",
      newPassword: "",
      reNewPassword: ""
   };
   const validationSchema = Yup.object().shape({
      oldPassword: Yup.string().trim().required("Contraseña requerida"),
      newPassword: Yup.string().trim().min(6, "Mínimo 6 caracteres").required("Nueva contraseña requerida"),
      reNewPassword: Yup.string()
         .trim()
         .test("confirmPassword", "Las contraseñas no coinciden", (value) => value.match(formik.values.newPassword))
         .required("Validacion de nueva contraseña requerida")
   });
   const onSubmit = async (values) => {
      // return console.log("🚀 ~ onSubmit ~ values:", values);
      try {
         setIsLoading(true);
         formik.setSubmitting(true);

         const res = await updatePassword(values);
         console.log("🚀 ~ onSubmit ~ res:", res);
         SimpleToast(res.message);

         formik.setSubmitting(false);
         setIsLoading(false);

         if (res.status && res.alert_icon == "success") router.dismissAll();

         // router.replace("(main)");
      } catch (error) {
         console.log("🚀 ~ onSubmit ~ error:", error);
         throw Error(error);
      } finally {
         formik.setSubmitting(false);
      }
   };
   const formik = useFormik({
      initialValues: initialValues,
      onSubmit: (values) => onSubmit(values),
      validationSchema: validationSchema
   });

   return (
      <>
         {/* <SafeAreaView className={`h-full`}> */}
         {/* <HeaderComponent /> */}
         <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" alwaysBounceVertical={true}>
            <View className={`flex-1 bg-white p-4`}>
               <FormikComponent formik={formik} textBtnSubmit={"CAMBIAR"}>
                  <InputComponent
                     formik={formik}
                     idName={"oldPassword"}
                     label={"Contraseña Actual *"}
                     placeholder={"Escribe tu contraseña actual"}
                     isPassword={true}
                  />
                  <InputComponent formik={formik} idName={"newPassword"} label={"Nueva contraseña *"} placeholder={"Escribe tu nueva contraseña"} isPassword={true} />
                  <InputComponent
                     formik={formik}
                     idName={"reNewPassword"}
                     label={"Confirmar nueva contraseña *"}
                     placeholder={"Confirma tu nueva contraseña"}
                     isPassword={true}
                  />
               </FormikComponent>
            </View>
         </KeyboardAwareScrollView>
         <FooterComponent />
         {/* </SafeAreaView> */}
      </>
   );
};

export default ChangePassword;
