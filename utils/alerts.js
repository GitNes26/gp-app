import { ToastAndroid } from "react-native";

/**
 *
 * @param {string} msg Mensaje a emitir
 * @param {string} gravity "center" | "bottom" | "top"
 * @returns
 */
export const SimpleToast = (msg, gravity) => {
   return ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.LONG,
      gravity === "center"
         ? ToastAndroid.CENTER
         : gravity === "bottom"
           ? ToastAndroid.BOTTOM
           : ToastAndroid.TOP,
   );
};
