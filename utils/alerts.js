import { Alert, Platform, ToastAndroid } from "react-native";

/**
 *
 * @param {string} msg Mensaje a emitir
 * @param {string} gravity "center" | "bottom" | "top"
 * @returns
 */
export const SimpleToast = (msg, gravity = "center") => {
   if (Platform.OS === "android") {
      return ToastAndroid.showWithGravity(
         msg,
         ToastAndroid.LONG,
         gravity === "top" ? ToastAndroid.TOP : gravity === "bottom" ? ToastAndroid.BOTTOM : ToastAndroid.CENTER
      );
   } else {
      return Alert.alert(msg);
   }
};
